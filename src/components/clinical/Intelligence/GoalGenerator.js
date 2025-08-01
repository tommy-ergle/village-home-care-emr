// Goal Generator - Generate SMART goals based on assessment data
export class GoalGenerator {
  constructor() {
    this.goalTemplates = {
      ambulation: {
        shortTerm: [
          'Patient will ambulate {distance} feet with {device} and {assistance} on level surfaces within {timeframe}',
          'Patient will demonstrate safe ambulation technique with {device} during {duration} minute therapy sessions within {timeframe}',
          'Patient will increase ambulation distance by {percent}% from baseline of {baseline} feet within {timeframe}'
        ],
        longTerm: [
          'Patient will ambulate {distance} feet independently with {device} on all surfaces within the home within {timeframe}',
          'Patient will demonstrate functional community ambulation for {distance} feet with {device} within {timeframe}',
          'Patient will return to prior level of ambulation independence within {timeframe}'
        ]
      },
      transfers: {
        shortTerm: [
          'Patient will perform bed mobility with {assistance} using proper body mechanics within {timeframe}',
          'Patient will complete sit to stand transfers with {assistance} from standard height surfaces within {timeframe}',
          'Patient will demonstrate safe transfer technique with {assistance} during daily activities within {timeframe}'
        ],
        longTerm: [
          'Patient will perform all transfers independently using {device} within {timeframe}',
          'Patient will complete car transfers independently for community mobility within {timeframe}',
          'Patient will demonstrate independent and safe transfers in all home environments within {timeframe}'
        ]
      },
      adls: {
        shortTerm: [
          'Patient will complete upper body dressing with {assistance} while seated within {timeframe}',
          'Patient will perform bathing tasks with {assistance} using adaptive equipment within {timeframe}',
          'Patient will demonstrate {percent}% independence with grooming tasks within {timeframe}'
        ],
        longTerm: [
          'Patient will complete all ADLs independently using adaptive equipment as needed within {timeframe}',
          'Patient will demonstrate full independence with personal care activities within {timeframe}',
          'Patient will return to prior level of ADL independence within {timeframe}'
        ]
      },
      strength: {
        shortTerm: [
          'Patient will demonstrate {grade}/5 strength in {muscle_group} within {timeframe}',
          'Patient will complete {repetitions} repetitions of {exercise} with {resistance} within {timeframe}',
          'Patient will show {percent}% improvement in {muscle_group} strength as measured by manual muscle testing within {timeframe}'
        ],
        longTerm: [
          'Patient will achieve functional strength of {grade}/5 in all major muscle groups within {timeframe}',
          'Patient will demonstrate strength sufficient for all functional activities within {timeframe}',
          'Patient will return to prior level of strength and function within {timeframe}'
        ]
      },
      balance: {
        shortTerm: [
          'Patient will maintain static standing balance for {duration} seconds with {support} within {timeframe}',
          'Patient will score {score} on Berg Balance Scale demonstrating {percent}% improvement within {timeframe}',
          'Patient will complete dynamic balance activities with {assistance} for {duration} minutes within {timeframe}'
        ],
        longTerm: [
          'Patient will demonstrate independent static and dynamic balance for all functional activities within {timeframe}',
          'Patient will achieve low fall risk classification on standardized balance assessment within {timeframe}',
          'Patient will safely navigate all home environments without loss of balance within {timeframe}'
        ]
      },
      cognition: {
        shortTerm: [
          'Patient will follow {number}-step commands with {cues} during functional tasks within {timeframe}',
          'Patient will demonstrate {percent}% accuracy with orientation questions within {timeframe}',
          'Patient will complete simple problem-solving tasks with {assistance} within {timeframe}'
        ],
        longTerm: [
          'Patient will demonstrate functional cognition for safe independent living within {timeframe}',
          'Patient will independently manage medications and appointments within {timeframe}',
          'Patient will return to prior level of cognitive function for daily activities within {timeframe}'
        ]
      },
      pain: {
        shortTerm: [
          'Patient will report pain level of {level}/10 or less during functional activities within {timeframe}',
          'Patient will demonstrate use of {number} pain management techniques independently within {timeframe}',
          'Patient will show {percent}% reduction in pain medication use within {timeframe}'
        ],
        longTerm: [
          'Patient will manage pain at tolerable levels for all daily activities within {timeframe}',
          'Patient will demonstrate independent pain management strategies within {timeframe}',
          'Patient will return to functional activities with minimal pain interference within {timeframe}'
        ]
      }
    };

    this.assistanceLevels = [
      'independently',
      'with supervision',
      'with contact guard assist',
      'with minimal assistance',
      'with moderate assistance',
      'with maximal assistance',
      'with total assistance'
    ];

    this.timeframes = {
      shortTerm: ['1 week', '2 weeks', '3 weeks', '4 weeks'],
      longTerm: ['4 weeks', '6 weeks', '8 weeks', '12 weeks', '90 days']
    };

    this.devices = {
      ambulation: ['standard walker', 'rolling walker', 'single point cane', 'quad cane', 'no device'],
      transfers: ['grab bars', 'transfer board', 'gait belt', 'no device']
    };
  }

  // Generate goals based on assessment data
  generateGoals(assessmentData, documentType = 'pt-eval') {
    const goals = {
      shortTerm: [],
      longTerm: [],
      functional: [],
      discharge: []
    };

    // Analyze assessment data to determine goal areas
    const goalAreas = this.analyzeAssessmentData(assessmentData);

    // Generate short-term goals
    for (const area of goalAreas) {
      const shortTermGoal = this.generateShortTermGoal(area, assessmentData);
      if (shortTermGoal) {
        goals.shortTerm.push(shortTermGoal);
      }
    }

    // Generate long-term goals
    for (const area of goalAreas) {
      const longTermGoal = this.generateLongTermGoal(area, assessmentData);
      if (longTermGoal) {
        goals.longTerm.push(longTermGoal);
      }
    }

    // Generate functional goals
    goals.functional = this.generateFunctionalGoals(assessmentData);

    // Generate discharge goals
    goals.discharge = this.generateDischargeGoals(assessmentData);

    return goals;
  }

  // Analyze assessment data to determine focus areas
  analyzeAssessmentData(assessmentData) {
    const areas = [];

    if (assessmentData.functionalStatus) {
      if (assessmentData.functionalStatus.ambulation) {
        areas.push('ambulation');
      }
      if (assessmentData.functionalStatus.transfers) {
        areas.push('transfers');
      }
      if (assessmentData.functionalStatus.adls) {
        areas.push('adls');
      }
      if (assessmentData.functionalStatus.balance) {
        areas.push('balance');
      }
    }

    // Add areas based on identified deficits
    if (assessmentData.strength && assessmentData.strength < 4) {
      areas.push('strength');
    }
    if (assessmentData.cognition && assessmentData.cognition.deficits) {
      areas.push('cognition');
    }
    if (assessmentData.pain && assessmentData.pain.level > 3) {
      areas.push('pain');
    }

    return areas.length > 0 ? areas : ['ambulation', 'transfers', 'adls'];
  }

  // Generate short-term goal for specific area
  generateShortTermGoal(area, assessmentData) {
    const templates = this.goalTemplates[area]?.shortTerm;
    if (!templates || templates.length === 0) return null;

    // Select appropriate template
    const template = templates[Math.floor(Math.random() * templates.length)];

    // Fill in template variables
    const variables = this.determineGoalVariables(area, assessmentData, 'shortTerm');
    let goal = template;

    for (const [key, value] of Object.entries(variables)) {
      goal = goal.replace(`{${key}}`, value);
    }

    return {
      area,
      type: 'shortTerm',
      goal,
      measurable: true,
      timeframe: variables.timeframe
    };
  }

  // Generate long-term goal for specific area
  generateLongTermGoal(area, assessmentData) {
    const templates = this.goalTemplates[area]?.longTerm;
    if (!templates || templates.length === 0) return null;

    // Select appropriate template
    const template = templates[Math.floor(Math.random() * templates.length)];

    // Fill in template variables
    const variables = this.determineGoalVariables(area, assessmentData, 'longTerm');
    let goal = template;

    for (const [key, value] of Object.entries(variables)) {
      goal = goal.replace(`{${key}}`, value);
    }

    return {
      area,
      type: 'longTerm',
      goal,
      measurable: true,
      timeframe: variables.timeframe
    };
  }

  // Determine appropriate values for goal variables
  determineGoalVariables(area, assessmentData, termType) {
    const variables = {};

    // Common variables
    variables.timeframe = this.timeframes[termType][termType === 'shortTerm' ? 1 : 2];

    // Area-specific variables
    switch (area) {
      case 'ambulation':
        variables.distance = termType === 'shortTerm' ? '50' : '150';
        variables.device = this.determineDevice(assessmentData, 'ambulation');
        variables.assistance = this.determineAssistanceLevel(assessmentData, termType);
        variables.duration = '30';
        variables.percent = '25';
        variables.baseline = '20';
        break;

      case 'transfers':
        variables.assistance = this.determineAssistanceLevel(assessmentData, termType);
        variables.device = this.determineDevice(assessmentData, 'transfers');
        break;

      case 'adls':
        variables.assistance = this.determineAssistanceLevel(assessmentData, termType);
        variables.percent = termType === 'shortTerm' ? '50' : '90';
        break;

      case 'strength':
        variables.grade = termType === 'shortTerm' ? '4' : '5';
        variables.muscle_group = 'bilateral lower extremities';
        variables.repetitions = '10';
        variables.exercise = 'therapeutic exercises';
        variables.resistance = 'moderate resistance';
        variables.percent = '25';
        break;

      case 'balance':
        variables.duration = termType === 'shortTerm' ? '30' : '60';
        variables.support = termType === 'shortTerm' ? 'minimal support' : 'no support';
        variables.score = '45';
        variables.percent = '20';
        variables.assistance = this.determineAssistanceLevel(assessmentData, termType);
        break;

      case 'cognition':
        variables.number = termType === 'shortTerm' ? '2' : '3';
        variables.cues = termType === 'shortTerm' ? 'verbal cues' : 'no cues';
        variables.percent = termType === 'shortTerm' ? '75' : '95';
        variables.assistance = 'minimal cues';
        break;

      case 'pain':
        variables.level = termType === 'shortTerm' ? '5' : '3';
        variables.number = '3';
        variables.percent = '50';
        break;
    }

    return variables;
  }

  // Determine appropriate assistance level
  determineAssistanceLevel(assessmentData, termType) {
    const currentLevel = assessmentData.functionalStatus?.assistanceLevel || 3;
    
    if (termType === 'shortTerm') {
      return this.assistanceLevels[Math.max(0, currentLevel - 1)];
    } else {
      return this.assistanceLevels[Math.max(0, currentLevel - 2)];
    }
  }

  // Determine appropriate device
  determineDevice(assessmentData, activity) {
    const currentDevice = assessmentData.functionalStatus?.currentDevice;
    const devices = this.devices[activity];

    if (currentDevice && devices.includes(currentDevice)) {
      return currentDevice;
    }

    return devices[0]; // Default to first device
  }

  // Generate functional goals
  generateFunctionalGoals(assessmentData) {
    const functionalGoals = [];

    functionalGoals.push({
      goal: 'Patient will safely navigate all areas of the home including stairs with appropriate device and technique',
      area: 'functional mobility',
      priority: 'high'
    });

    functionalGoals.push({
      goal: 'Patient will independently manage all personal care activities maintaining safety awareness',
      area: 'self-care',
      priority: 'high'
    });

    if (assessmentData.livingArrangement === 'alone') {
      functionalGoals.push({
        goal: 'Patient will independently prepare simple meals while maintaining safe standing balance',
        area: 'IADL',
        priority: 'medium'
      });
    }

    return functionalGoals;
  }

  // Generate discharge goals
  generateDischargeGoals(assessmentData) {
    const dischargeGoals = [];

    dischargeGoals.push({
      goal: 'Patient will return to prior level of function with independence in all mobility and self-care activities',
      criteria: 'Met all therapy goals'
    });

    dischargeGoals.push({
      goal: 'Patient and/or caregiver will demonstrate understanding of home exercise program',
      criteria: 'Demonstrates HEP independently'
    });

    dischargeGoals.push({
      goal: 'Patient will have all necessary adaptive equipment and demonstrate safe use',
      criteria: 'Equipment in place and used correctly'
    });

    return dischargeGoals;
  }

  // Update goals based on progress
  updateGoals(currentGoals, progressData) {
    const updatedGoals = [];

    for (const goal of currentGoals) {
      const progress = this.assessGoalProgress(goal, progressData);
      
      if (progress.achieved) {
        // Goal met - create progression goal
        updatedGoals.push(this.createProgressionGoal(goal, progressData));
      } else if (progress.onTrack) {
        // Keep current goal
        updatedGoals.push(goal);
      } else {
        // Modify goal to be more achievable
        updatedGoals.push(this.modifyGoal(goal, progress));
      }
    }

    return updatedGoals;
  }

  // Assess progress toward goal
  assessGoalProgress(goal, progressData) {
    // This would use more sophisticated analysis in production
    return {
      achieved: Math.random() > 0.7,
      onTrack: Math.random() > 0.5,
      percentComplete: Math.floor(Math.random() * 100)
    };
  }

  // Create progression goal
  createProgressionGoal(achievedGoal, progressData) {
    // Advance to next level of independence or function
    const newGoal = { ...achievedGoal };
    newGoal.goal = newGoal.goal.replace(/minimal/g, 'contact guard');
    newGoal.goal = newGoal.goal.replace(/moderate/g, 'minimal');
    newGoal.goal = newGoal.goal.replace(/50/g, '100');
    newGoal.goal = newGoal.goal.replace(/2 weeks/g, '4 weeks');
    
    return newGoal;
  }

  // Modify goal to be more achievable
  modifyGoal(goal, progress) {
    const modifiedGoal = { ...goal };
    modifiedGoal.goal = modifiedGoal.goal.replace(/2 weeks/g, '3 weeks');
    modifiedGoal.goal = modifiedGoal.goal.replace(/4 weeks/g, '6 weeks');
    modifiedGoal.goal = modifiedGoal.goal.replace(/100/g, '75');
    modifiedGoal.modified = true;
    modifiedGoal.reason = 'Adjusted based on current progress rate';
    
    return modifiedGoal;
  }
}

// Export singleton instance
export default new GoalGenerator();