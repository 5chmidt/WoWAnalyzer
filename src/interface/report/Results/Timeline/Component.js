import React from 'react';
import PropTypes from 'prop-types';

import { formatDuration } from 'common/format';
import DragScroll from 'interface/common/DragScroll';
import CASTS_THAT_ARENT_CASTS from 'parser/core/CASTS_THAT_ARENT_CASTS';
import BuffsModule from 'parser/core/modules/Buffs';
import CombatLogParser from 'parser/core/CombatLogParser';

import Buffs from './Buffs';
import Casts from './Casts';
import Lane from './Lane';
import './Timeline.scss';

class Timeline extends React.PureComponent {
  static propTypes = {
    abilities: PropTypes.object.isRequired,
    buffs: PropTypes.instanceOf(BuffsModule).isRequired,
    parser: PropTypes.instanceOf(CombatLogParser).isRequired,
  };
  static defaultProps = {
    showCooldowns: true,
    showGlobalCooldownDuration: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      zoom: 2,
      padding: 0,
    };
    this.setContainerRef = this.setContainerRef.bind(this);
  }

  get fight() {
    return this.props.parser.fight;
  }
  get start() {
    return this.fight.start_time;
  }
  get end() {
    return this.fight.end_time;
  }
  get duration() {
    return this.end - this.start;
  }
  get seconds() {
    return Math.ceil(this.duration / 1000);
  }
  get secondWidth() {
    return 120 / this.state.zoom;
  }
  get totalWidth() {
    return this.seconds * this.secondWidth;
  }
  laneHeight = 18;
  centerOffset = 25;

  isApplicableEvent(event) {
    switch (event.type) {
      case 'cast':
        return this.isApplicableCastEvent(event);
      case 'updatespellusable':
        return this.isApplicableUpdateSpellUsableEvent(event);
      default:
        return false;
    }
  }
  isApplicableCastEvent(event) {
    const parser = this.props.parser;

    if (!parser.byPlayer(event)) {
      // Ignore pet/boss casts
      return false;
    }
    const spellId = event.ability.guid;
    if (CASTS_THAT_ARENT_CASTS.includes(spellId)) {
      return false;
    }
    const ability = this.props.abilities.getAbility(spellId);
    if (!ability || !ability.cooldown) {
      return false;
    }
    return true;
  }
  isApplicableUpdateSpellUsableEvent(event) {
    if (event.trigger !== 'endcooldown' && event.trigger !== 'restorecharge') {
      // begincooldown is unnecessary since endcooldown includes the start time
      return false;
    }
    return true;
  }
  /**
   * @param {object[]} events
   * @returns {Map<int, object[]>} Events grouped by spell id.
   */
  getEventsBySpellId(events) {
    const eventsBySpellId = new Map();
    events.forEach(event => {
      if (!this.isApplicableEvent(event)) {
        return;
      }

      const spellId = event.ability.guid;
      if (!eventsBySpellId.has(spellId)) {
        eventsBySpellId.set(spellId, []);
      }
      eventsBySpellId.get(spellId).push(event);
    });
    return eventsBySpellId;
  }
  /**
   * Separate cast windows from the rest of the spells.
   * @param {Map<int, object[]>} eventsBySpellId
   * @returns {{castWindows: Map<int, object[]>, others: Map<int, object[]>}}
   */
  separateCastWindows(eventsBySpellId) {
    const abilities = this.props.abilities;
    const castWindows = new Map();
    const others = new Map();

    eventsBySpellId.forEach((value, spellId) => {
      const ability = abilities.getAbility(spellId);
      if (ability && ability.timelineSortIndex < 0) {
        castWindows.set(spellId, value);
      } else {
        others.set(spellId, value);
      }
    });

    return { castWindows, others };
  }
  getOffsetTop(index) {
    return this.centerOffset + index * this.laneHeight;
  }
  getOffsetLeft(timestamp) {
    return (timestamp - this.start) / 1000 * this.secondWidth;
  }

  getSortIndex([spellId, events]) {
    const ability = this.props.abilities.getAbility(spellId);
    if (!ability || ability.timelineSortIndex === undefined) {
      return 1000 - events.length;
    } else {
      return ability.timelineSortIndex;
    }
  }

  setContainerRef(elem) {
    if (!elem || !elem.getBoundingClientRect) {
      return;
    }
    this.setState({
      padding: elem.getBoundingClientRect().x + 15, // 15 for padding
    });
  }

  renderLane([spellId, events], index, growUp) {
    return (
      <Lane
        key={spellId}
        spellId={spellId}
        style={{
          top: this.getOffsetTop(index) * (growUp ? -1 : 1),
          width: this.totalWidth,
        }}
        fightStartTimestamp={this.start}
        fightEndTimestamp={this.end}
        secondWidth={this.secondWidth}
      >
        {events}
      </Lane>
    );
  }
  renderLanes(eventsBySpellId, growUp) {
    return Array.from(eventsBySpellId)
      .sort((a, b) => this.getSortIndex(growUp ? b : a) - this.getSortIndex(growUp ? a : b))
      .map((item, index) => this.renderLane(item, index, growUp));
  }

  render() {
    const { parser, buffs } = this.props;

    const skipInterval = Math.ceil(40 / this.secondWidth);

    const eventsBySpellId = this.getEventsBySpellId(parser.eventHistory);

    return (
      <>
        <div className="container" ref={this.setContainerRef} />
        <DragScroll className="spell-timeline-container">
          <div
            className="spell-timeline"
            style={{
              width: this.totalWidth + this.state.padding * 2,
              paddingTop: 0,
              paddingBottom: this.getOffsetTop(eventsBySpellId.size), // automaticly fit perfectly
              paddingLeft: this.state.padding,
              paddingRight: this.state.padding, // we also want the user to have the satisfying feeling of being able to get the right side to line up
            }}>
            <Buffs
              start={this.start}
              secondWidth={this.secondWidth}
              parser={parser}
              buffs={buffs}
            />
            <div className="time-line">
              {this.seconds > 0 && [...Array(this.seconds)].map((_, second) => (
                <div
                  key={second}
                  style={{ width: this.secondWidth * skipInterval }}
                  data-duration={formatDuration(second)}
                />
              ))}
            </div>
            <Casts
              start={this.start}
              secondWidth={this.secondWidth}
              parser={parser}
            />
            <div className="cooldowns">
              {this.renderLanes(eventsBySpellId, false)}
            </div>
          </div>
        </DragScroll>
      </>
    );
  }
}

export default Timeline;
