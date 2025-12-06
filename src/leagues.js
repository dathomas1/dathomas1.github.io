const LEAGUE_CONDITIONS = {
  front_office_grade_a: isFrontOfficeGradeEqualToA,
  front_office_grade_b_or_better: isFrontOfficeGradeBorBetter,
  front_office_grade_c_or_lower: isFrontOfficeGradeCorLower,
  front_office_grade_d: isFrontOfficeGradeEqualToD,
  meddling_ownership: isMeddlingOwnership,
  savvy_ownership: isSavyOwnership,
};

function isFrontOfficeGradeEqualToA(team) {
  return team.front_office_grade === 'A';
}

function isFrontOfficeGradeBorBetter(team) {
  return team.front_office_grade === 'A' || team.front_office_grade === 'B';
}

function isFrontOfficeGradeCorLower(team) {
  return (
    team.front_office_grade === 'C' ||
    team.front_office_grade === 'D' ||
    team.front_office_grade === 'F'
  );
}

function isFrontOfficeGradeEqualToD(team) {
  return team.front_office_grade === 'D';
}

function isMeddlingOwnership(team) {
  return team.ownership_style === 'MEDDLING';
}

function isSavyOwnership(team) {
  return team.ownership_style === 'SAVVY';
}

const BLANK_TEAMNAME = '______________________';
const BLANK_CONFERENCE = '___________';
const GRADE = { A: 2, B: 1, C: 0, D: -1, F: -2 };
const STAT_ARRAY = ['INT', 'FUM', 'PEN'];
const OFFENSE_PROFILES = ['Prolific', 'Semi_Prolific', 'Dull', 'Semi_Dull'];
const DEFENSE_PROFILES = ['Staunch', 'Semi_Staunch', 'Inept', 'Semi_Inept'];
const ST_QUALITIES = ['KR', 'PR', 'FG', 'XP'];
const OFFENSE_OTHER_QUALITIES = [
  ['RELIABLE', 'RELIABLE•', 'SHAKY•', 'SHAKY'],
  ['SECURE', 'SECURE•', 'CLUMSY•', 'CLUMSY'],
  ['DISCIPLINED', 'DISCIPLINED•', 'UNDISCIPLINED•', 'UNDISCIPLINED'],
];
const DEFENSE_OTHER_QUALITIES = [
  ['AGGRESSIVE', 'AGGRESSIVE•', 'MEEK•', 'MEEK'],
  ['ACTIVE', 'ACTIVE•', 'PASSIVE•', 'PASSIVE'],
  ['DISCIPLINED', 'DISCIPLINED•', 'UNDISCIPLINED•', 'UNDISCIPLINED'],
];
const FRONT_OFFICE_GRADES = ['D', 'C', 'C', 'B', 'B', 'A'];
const OWNER_STYLE = ['MEDDLING', 'None', 'None', 'None', 'None', 'SAVVY'];
const OWNER_LOYALTY = ['SELFISH', 'None', 'None', 'None', 'None', 'LOYAL'];
const CDV_RATIO = 0.08;

class League {
  constructor(team_count) {
    this.teams_as_map = this.create_teams(team_count);
    this.teams = this.teams_as_map.values().toArray();
    this.team_ids = this.teams_as_map.keys().toArray();
    this.cdv = this.calculate_CDV(team_count);
    this.qv = this.calculate_QV(team_count);
    this.team_count = this.teams_as_map.size;
  }
  assign_quality_array(team, quality_type, quality_array) {
    for (let i = 0; i < quality_array.length; i++) {
      let clean_value = quality_array[i].trim();
      this.assign_quality_to_set(team, quality_type, clean_value);
    }
  }

  assign_quality(team, quality_type, quality_value) {
    let clean_value = isNaN(quality_value)
      ? quality_value.trim()
      : quality_value;
    team[quality_type] = clean_value;
  }

  set_owner_style(team, dice_num = undefined) {
    let dice = dice_num || roll_d6_die();
    let quality = OWNER_STYLE[dice - 1];
    this.assign_quality(team, 'ownership_style', quality);
  }

  set_owner_loyalty(team, dice_num = undefined) {
    let dice = dice_num || roll_d6_die();
    let quality = OWNER_LOYALTY[dice - 1];
    this.assign_quality(team, 'ownership_loyalty', quality);
  }

  set_front_office_grade(team, dice_num = undefined) {
    let dice = dice_num || roll_d6_die();
    let quality = FRONT_OFFICE_GRADES[dice - 1];
    this.assign_quality(team, 'front_office_grade', quality);
  }

  set_head_coach_grade(team, dicestring = undefined) {
    let grade = this.determine_head_coach_grade(team, dicestring);
    this.assign_quality(team, 'head_coach_grade', grade);
  }

  determine_head_coach_grade(team, dicestring = undefined) {
    let dice = dicestring || roll_2d6_sorted(); //Roll Dice
    let criteria = COACH_CREATION_TABLE[dice];
    if (Object.hasOwn(criteria, 'result')) {
      return criteria.result;
    }
    return LEAGUE_CONDITIONS[criteria.condition](team)
      ? criteria.on.result
      : criteria.off.result;
  }

  set_franchise_info() {
    this.teams_as_map.forEach((team) => {
      this.set_owner_style(team);
      this.set_owner_loyalty(team);
      this.set_front_office_grade(team);
      this.set_head_coach_grade(team);
    });
  }

  generate() {
    this.set_franchise_info();
    this.set_team_profile('offensive_qualities', true);
    this.set_other_qualities('offensive_qualities', true);
    this.set_team_profile('defensive_qualities', true);
    this.set_other_qualities('defensive_qualities', true);
    this.set_efficient_quality(true);
    this.set_inefficient_quality(true);
    this.teams_as_map.forEach((team) => {
      this.set_special_teams(team);
      this.assign_quality(team, 'TR', this.calculate_TR(team));
    });
  }

  assign_quality_to_set(team, quality_type, quality_value) {
    if (team[quality_type] === undefined) {
      team[quality_type] = new Set();
    }
    let clean_value = quality_value.trim();
    team[quality_type].add(clean_value);
  }
  display_team_html(team) {
    let html = "<div class='team_card'>";
    html += `<div class='card_header'><div class="left-triangle"><div class="left-small-triangle"></div></div>
        <div class="right-triangle"><div class="right-small-triangle"></div></div><div class='team_name'><h1>${team.teamname}</h1><p>HC Grade: ${team.head_coach_grade}</p></div><div class='conference'><h2>${team.conference}</h2><p>TR: ${team.TR}</p></div></div>`;
    html += "<div class='card_body'><div class='offense'><h2>Offense</h2>";
    html += '<ul>';
    if (team.offensive_qualities) {
      team.offensive_qualities.forEach((element) => {
        html += `<li>${element}</li>`;
      });
    }
    html += '</ul></div>';
    html += "<div class='defense'><h2>Defense</h2>";
    html += '<ul>';
    if (team.defensive_qualities) {
      team.defensive_qualities.forEach((element) => {
        html += `<li>${element}</li>`;
      });
    }
    html += '</ul></div>';
    html += "<div class='special_teams'><ul>";
    html += `<li><span class='st_title'>KR</span> ${team.KR}</li>`;
    html += `<li><span class='st_title'>PR</span> ${team.PR}</li>`;
    html += `<li><span class='st_title'>FG</span> ${team.FG}</li>`;
    html += `<li><span class='st_title'>XP</span> ${team.XP}</li>`;
    html += '</ul></div></div>';
    html += "<div class='card_footer'><div class='franchise'><ul>";
    html += `<li>FO Grade: ${team.front_office_grade}</li>`;
    html += `<li>Owner Style: ${team.ownership_style}</li>`;
    html += `<li>Loyalty: ${team.ownership_loyalty}</li>`;
    html += `<li>#${team.id + 1}</li>`;
    html += '</ul></div></div>';
    html += '</div>';
    return html;
  }

  display_league_html() {
    let html = "<div class='league_card'>";
    this.teams_as_map.forEach((team) => {
      html += this.display_team_html(team);
    });
    html += '</div>';
    return html;
  }

  calculate_TR(team) {
    // TODO NEED TO ERROR
    let total = 0;
    let offense_total = 0;
    let defense_total = 0;
    if (team.offensive_qualities) {
      team.offensive_qualities.forEach((item) => {
        let value = QUALITY[quality_text_to_key(item)].tr_value;
        offense_total += value;
      });
    }
    if (team.defensive_qualities) {
      team.defensive_qualities.forEach((item) => {
        let value = QUALITY[quality_text_to_key(item)].tr_value;
        defense_total += value;
      });
    }
    total = offense_total + defense_total;
    return Math.round(total / 2);
  }

  set_special_teams(team, dicestring = undefined) {
    //TODO SETUP TESTING
    for (let i = 0; i < ST_QUALITIES.length; i++) {
      let quality_type = ST_QUALITIES[i];

      let dice = dicestring || roll_2d6_sorted(); //Roll Dice
      let quality_value = TEAM_CREATION_TABLE[quality_type][dice];
      if (quality_value === QUALITY.NO_QUALITY.text) {
        quality_value = '';
      }
      this.assign_quality(team, quality_type, quality_value);
    }
  }
  set_efficient_quality(shuffle = false) {
    let all_team_ids = this.team_ids.slice();
    if (shuffle) {
      shuffle_mutation(all_team_ids);
    }
    let random_team_ids = all_team_ids.slice(0, 2 * this.qv);
    let remaining_teams = all_team_ids.slice(2 * this.qv);
    let head_grade_a_teams = remaining_teams.filter((id) => this.teams_as_map.get(id).head_coach_grade === 'A');
    let efficient_team_ids = random_team_ids.concat(head_grade_a_teams);
    
    let index = 0;
    if (shuffle) {
      shuffle_mutation(efficient_team_ids);
    }
    for (let j = 0; j < this.qv; j++) {
      let team = this.teams_as_map.get(efficient_team_ids[index]);
      this.assign_quality_to_set(team, 'offensive_qualities', QUALITY.EFFICIENT.text);
      index++;
    }
    for (let j = 0; j < this.qv; j++) {
      let team = this.teams_as_map.get(efficient_team_ids[index]);
      this.assign_quality_to_set(team, 'offensive_qualities', QUALITY.SEMI_EFFICIENT.text);
      index++;
    }
  }
  set_inefficient_quality(shuffle = false) {
    let all_team_ids = this.team_ids.filter((id) => !(this.teams_as_map.get(id).offensive_qualities?.has(QUALITY.SEMI_EFFICIENT.text) || this.teams_as_map.get(id).offensive_qualities?.has(QUALITY.EFFICIENT.text)));
    if (shuffle) {
      shuffle_mutation(all_team_ids);
    }
    let random_team_ids = all_team_ids.slice(0, 2 * this.qv);
    let remaining_teams = all_team_ids.slice(2 * this.qv);
    let head_grade_d_teams = remaining_teams
    let inefficient_team_ids = random_team_ids.concat(head_grade_d_teams);
    
    let index = 0;
    if (shuffle) {
      shuffle_mutation(inefficient_team_ids);
    }
    for (let j = 0; j < this.qv; j++) {
      let team = this.teams_as_map.get(inefficient_team_ids[index]);
      this.assign_quality_to_set(team, 'offensive_qualities', QUALITY.INEFFICIENT.text);
      index++;
    }
    for (let j = 0; j < this.qv; j++) {
      let team = this.teams_as_map.get(inefficient_team_ids[index]);
      this.assign_quality_to_set(team, 'offensive_qualities', QUALITY.SEMI_INEFFICIENT.text);
      index++;
    }
  } 
  set_team_profile(
    qualities,
    shuffle = false,
    starting_index = 0,
    dicestring = undefined
  ) {
    let index = starting_index;
    let team_ids = this.team_ids.slice();
    let profile_list = undefined;
    if (qualities === 'offensive_qualities') {
      profile_list = OFFENSE_PROFILES;
    } else if (qualities === 'defensive_qualities') {
      profile_list = DEFENSE_PROFILES;
    } else {
      return;
    }

    if (shuffle) {
      shuffle_mutation(team_ids);
    }

    for (let i = 0; i < profile_list.length; i++) {
      let profile = profile_list[i];
      let footnote = profile + '_Random';

      for (let j = 0; j < this.cdv; j++) {
        // TODO
        let dice = dicestring || roll_2d6_sorted(); //Roll Dice
        let quality_array = TEAM_CREATION_TABLE[profile][dice].split(',');
        let team = this.teams_as_map.get(team_ids[index]);
        this.assign_quality_array(team, qualities, quality_array);
        index++;
        if (TEAM_CREATION_TABLE[footnote][dice] !== QUALITY.NO_QUALITY.text) {
          team = this.teams_as_map.get(team_ids[index]);
          quality_array = TEAM_CREATION_TABLE[footnote][dice].split(',');
          this.assign_quality_array(team, qualities, quality_array);
          index++;
        }
      }
    }
  }
  set_other_qualities(qualities, shuffle = false, starting_index = 0) {
    let index = starting_index;
    let team_ids = this.team_ids.slice();
    let other_qualities = undefined;
    if (qualities === 'offensive_qualities') {
      other_qualities = OFFENSE_OTHER_QUALITIES;
    } else if (qualities === 'defensive_qualities') {
      other_qualities = DEFENSE_OTHER_QUALITIES;
    } else {
      return;
    }
    for (let i = 0; i < other_qualities.length; i++) {
      if (shuffle) {
        shuffle_mutation(team_ids);
      }

      let quality_list = other_qualities[i];
      for (let j = 0; j < quality_list.length; j++) {
        for (let k = 0; k < this.cdv; k++) {
          let team = this.teams_as_map.get(team_ids[index]);
          this.assign_quality_to_set(team, qualities, quality_list[j]);
          index++;
        }
      }

      index = starting_index;
    }
    return;
  }

  create_teams(num_of_teams) {
    let teams = new Map();
    for (let i = 0; i < num_of_teams; i++) {
      teams.set(i, { id: i, teamname: BLANK_TEAMNAME, conference: BLANK_CONFERENCE });
    }
    return teams;
  }

  calculate_QV(num_of_teams) {
    return this.calculate_CDV(num_of_teams) * 2;
  }

  calculate_CDV(num_of_teams) {
    return Math.round(num_of_teams * CDV_RATIO);
  }
}
