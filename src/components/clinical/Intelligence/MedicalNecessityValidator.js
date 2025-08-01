// Medical Necessity Validator - Ensure proper medical necessity documentation
export class MedicalNecessityValidator {
  constructor() {
    this.necessityIndicators = {
      complexity: [
        'multiple comorbidities',
        'complex medical condition',
        'unstable condition',
        'recent hospitalization',
        'recent surgery',
        'multiple medications',
        'high fall risk',
        'cognitive impairment',
        'safety concerns',
        'significant functional decline'
      ],
      skilledNeed: [
        'assessment and evaluation',
        'skilled observation',
        'teaching and training',
        'complex wound care',
        'medication management',
        'safety evaluation',
        'adaptive equipment training',
        'therapeutic exercise prescription',
        'manual therapy techniques',
        'cognitive training'
      ],
      professionalJudgment: [
        'clinical decision making',
        'treatment modification',
        'progress monitoring',
        'risk assessment',
        'discharge planning',
        'interdisciplinary coordination',
        'family education',
        'equipment recommendation'
      ],
      functionalLimitations: [
        'unable to ambulate',
        'requires assistance',
        'impaired balance',
        'decreased strength',
        'limited endurance',
        'cognitive deficits',
        'impaired safety awareness',
        'unable to perform ADLs',
        'communication deficits',
        'swallowing difficulties'
      ]
    };

    this.payerSpecificRequirements = {
      medicare: {
        homebound: [
          'considerable and taxing effort',
          'requires assistance to leave home',
          'medical contraindication',
          'psychiatric condition',
          'process of leaving home',
          'absences are infrequent'
        ],
        skilled: [
          'inherent complexity',
          'special medical complications',
          'sophisticated procedures',
          'condition of the patient',
          'accepted standards of medical practice'
        ]
      },
      medicaid: {
        priorAuth: [
          'prior authorization obtained',
          'medical review approved',
          'meets state guidelines'
        ]
      },
      commercial: {
        preAuth: [
          'pre-authorization number',
          'approved visits',
          'authorization dates'
        ]
      }
    };

    this.strengthPhrases = {
      strong: [
        'requires skilled',
        'medically necessary',
        'essential for safety',
        'prevent deterioration',
        'maintain function',
        'restore function',
        'prevent hospitalization',
        'complex medical needs'
      ],
      moderate: [
        'benefits from',
        'indicated for',
        'appropriate for',
        'recommended due to',
        'needed to address'
      ],
      weak: [
        'may help',
        'could benefit',
        'might improve',
        'possibly assist'
      ]
    };
  }

  // Validate medical necessity in document
  validateMedicalNecessity(document, payerType = 'medicare') {
    const validation = {
      score: 0,
      isValid: false,
      strengths: [],
      weaknesses: [],
      suggestions: [],
      payerSpecific: {}
    };

    // Analyze document content
    const content = this.extractDocumentText(document);
    
    // Check complexity indicators
    const complexityScore = this.assessComplexity(content);
    validation.score += complexityScore.score * 25;
    
    // Check skilled need documentation
    const skilledScore = this.assessSkilledNeed(content);
    validation.score += skilledScore.score * 30;
    
    // Check professional judgment
    const judgmentScore = this.assessProfessionalJudgment(content);
    validation.score += judgmentScore.score * 20;
    
    // Check functional limitations
    const limitationsScore = this.assessFunctionalLimitations(content);
    validation.score += limitationsScore.score * 25;

    // Payer-specific validation
    validation.payerSpecific = this.validatePayerRequirements(content, payerType);

    // Compile results
    validation.isValid = validation.score >= 75;
    validation.strengths = [
      ...complexityScore.strengths,
      ...skilledScore.strengths,
      ...judgmentScore.strengths,
      ...limitationsScore.strengths
    ];
    validation.weaknesses = [
      ...complexityScore.weaknesses,
      ...skilledScore.weaknesses,
      ...judgmentScore.weaknesses,
      ...limitationsScore.weaknesses
    ];

    // Generate suggestions
    validation.suggestions = this.generateSuggestions(validation);

    return validation;
  }

  // Extract text content from document
  extractDocumentText(document) {
    let text = '';
    
    if (document.content) {
      text += JSON.stringify(document.content.header) + '\n';
      
      if (document.content.sections) {
        for (const section of document.content.sections) {
          text += section.title + '\n';
          text += section.content + '\n';
        }
      }
    }
    
    return text.toLowerCase();
  }

  // Assess complexity indicators
  assessComplexity(content) {
    const result = {
      score: 0,
      strengths: [],
      weaknesses: []
    };

    let foundIndicators = 0;
    const requiredIndicators = 3;

    for (const indicator of this.necessityIndicators.complexity) {
      if (content.includes(indicator)) {
        foundIndicators++;
        result.strengths.push(`Documented: ${indicator}`);
      }
    }

    result.score = Math.min((foundIndicators / requiredIndicators), 1);

    if (foundIndicators < requiredIndicators) {
      result.weaknesses.push(
        `Need ${requiredIndicators - foundIndicators} more complexity indicators`
      );
    }

    return result;
  }

  // Assess skilled need documentation
  assessSkilledNeed(content) {
    const result = {
      score: 0,
      strengths: [],
      weaknesses: []
    };

    let foundNeeds = 0;
    const requiredNeeds = 2;

    for (const need of this.necessityIndicators.skilledNeed) {
      if (content.includes(need)) {
        foundNeeds++;
        result.strengths.push(`Skilled need: ${need}`);
      }
    }

    // Check for strong necessity language
    let strongPhraseCount = 0;
    for (const phrase of this.strengthPhrases.strong) {
      if (content.includes(phrase)) {
        strongPhraseCount++;
      }
    }

    result.score = Math.min(
      (foundNeeds / requiredNeeds) * 0.7 + 
      (strongPhraseCount / 3) * 0.3, 
      1
    );

    if (foundNeeds < requiredNeeds) {
      result.weaknesses.push('Insufficient skilled need documentation');
    }

    if (strongPhraseCount < 2) {
      result.weaknesses.push('Need stronger medical necessity language');
    }

    return result;
  }

  // Assess professional judgment documentation
  assessProfessionalJudgment(content) {
    const result = {
      score: 0,
      strengths: [],
      weaknesses: []
    };

    let foundJudgments = 0;

    for (const judgment of this.necessityIndicators.professionalJudgment) {
      if (content.includes(judgment)) {
        foundJudgments++;
        result.strengths.push(`Professional judgment: ${judgment}`);
      }
    }

    result.score = Math.min(foundJudgments / 2, 1);

    if (foundJudgments < 2) {
      result.weaknesses.push('Document more professional judgment aspects');
    }

    return result;
  }

  // Assess functional limitations
  assessFunctionalLimitations(content) {
    const result = {
      score: 0,
      strengths: [],
      weaknesses: []
    };

    let foundLimitations = 0;
    const requiredLimitations = 3;

    for (const limitation of this.necessityIndicators.functionalLimitations) {
      if (content.includes(limitation)) {
        foundLimitations++;
        result.strengths.push(`Functional limitation: ${limitation}`);
      }
    }

    result.score = Math.min(foundLimitations / requiredLimitations, 1);

    if (foundLimitations < requiredLimitations) {
      result.weaknesses.push('Document more specific functional limitations');
    }

    return result;
  }

  // Validate payer-specific requirements
  validatePayerRequirements(content, payerType) {
    const requirements = this.payerSpecificRequirements[payerType];
    if (!requirements) return { valid: true };

    const validation = {
      valid: true,
      missing: []
    };

    // Medicare homebound requirement
    if (payerType === 'medicare' && requirements.homebound) {
      let homeboundMet = false;
      for (const criteria of requirements.homebound) {
        if (content.includes(criteria)) {
          homeboundMet = true;
          break;
        }
      }
      if (!homeboundMet) {
        validation.valid = false;
        validation.missing.push('Homebound status documentation');
      }
    }

    // Check skilled requirements
    if (requirements.skilled) {
      let skilledMet = false;
      for (const criteria of requirements.skilled) {
        if (content.includes(criteria)) {
          skilledMet = true;
          break;
        }
      }
      if (!skilledMet) {
        validation.valid = false;
        validation.missing.push('Medicare skilled care criteria');
      }
    }

    return validation;
  }

  // Generate improvement suggestions
  generateSuggestions(validation) {
    const suggestions = [];

    // Score-based suggestions
    if (validation.score < 50) {
      suggestions.push(
        'Major revision needed: Add more medical necessity documentation throughout'
      );
    } else if (validation.score < 75) {
      suggestions.push(
        'Strengthen medical necessity language in assessment and plan sections'
      );
    }

    // Weakness-based suggestions
    if (validation.weaknesses.some(w => w.includes('complexity'))) {
      suggestions.push(
        'Document patient\'s medical complexity (comorbidities, medications, recent events)'
      );
    }

    if (validation.weaknesses.some(w => w.includes('skilled need'))) {
      suggestions.push(
        'Emphasize why skilled professional services are required vs. non-skilled care'
      );
    }

    if (validation.weaknesses.some(w => w.includes('language'))) {
      suggestions.push(
        'Use stronger terms: "requires", "essential", "medically necessary" instead of "may benefit"'
      );
    }

    // Payer-specific suggestions
    if (!validation.payerSpecific.valid) {
      for (const missing of validation.payerSpecific.missing) {
        suggestions.push(`Add ${missing} to meet payer requirements`);
      }
    }

    return suggestions;
  }

  // Enhance document with medical necessity language
  enhanceDocument(document, validation) {
    const enhancedDocument = JSON.parse(JSON.stringify(document));

    // Add medical necessity statement to appropriate sections
    if (enhancedDocument.content.sections) {
      for (const section of enhancedDocument.content.sections) {
        if (section.title.includes('Assessment') || section.title.includes('Clinical Impression')) {
          section.content = this.enhanceWithNecessityLanguage(
            section.content,
            'assessment'
          );
        }
        
        if (section.title.includes('Plan') || section.title.includes('Treatment')) {
          section.content = this.enhanceWithNecessityLanguage(
            section.content,
            'plan'
          );
        }
      }
    }

    return enhancedDocument;
  }

  // Add medical necessity language to content
  enhanceWithNecessityLanguage(content, sectionType) {
    const enhancements = {
      assessment: [
        '\n\nMedical Necessity: Due to the complexity of the patient\'s condition and multiple comorbidities, skilled therapy services are medically necessary to ensure safe functional mobility and prevent further decline.',
        '\n\nThe patient requires skilled professional assessment and intervention due to the inherent complexity of their medical condition and the need for ongoing clinical decision-making.',
        '\n\nSkilled services are essential to address safety concerns and prevent potential hospitalization.'
      ],
      plan: [
        '\n\nSkilled therapy services are required to safely progress the patient toward functional goals while monitoring for medical complications.',
        '\n\nProfessional judgment and expertise are necessary to modify treatment approaches based on the patient\'s variable medical status.',
        '\n\nContinued skilled intervention is medically necessary to maintain gains and prevent regression.'
      ]
    };

    const enhancement = enhancements[sectionType][0];
    
    if (!content.includes('medically necessary') && !content.includes('skilled')) {
      return content + enhancement;
    }
    
    return content;
  }

  // Generate medical necessity summary
  generateNecessitySummary(assessmentData) {
    const summary = [];

    summary.push('MEDICAL NECESSITY SUMMARY:');
    
    // Complexity
    if (assessmentData.diagnoses && assessmentData.diagnoses.length > 2) {
      summary.push(
        `• Multiple medical conditions (${assessmentData.diagnoses.length}) requiring skilled monitoring`
      );
    }

    // Functional status
    if (assessmentData.functionalStatus) {
      summary.push(
        '• Significant functional limitations requiring skilled intervention for safety'
      );
    }

    // Risk factors
    if (assessmentData.fallRisk || assessmentData.safety) {
      summary.push(
        '• High fall risk necessitating skilled assessment and intervention'
      );
    }

    // Skilled needs
    summary.push(
      '• Requires professional clinical judgment for treatment progression'
    );
    summary.push(
      '• Complex rehabilitation needs beyond scope of non-skilled care'
    );

    return summary.join('\n');
  }
}

// Export singleton instance
export default new MedicalNecessityValidator();