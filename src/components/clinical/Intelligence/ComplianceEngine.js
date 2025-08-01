// Compliance Engine - CMS compliance validation
export class ComplianceEngine {
  constructor() {
    this.complianceRules = {
      'poc': {
        name: 'Plan of Care (CMS 485)',
        requiredElements: [
          {
            id: 'patient_info',
            description: 'Complete patient demographics',
            fields: ['name', 'dob', 'address', 'medicare_number'],
            weight: 10
          },
          {
            id: 'physician_info',
            description: 'Physician information and certification',
            fields: ['physician_name', 'npi', 'certification_date'],
            weight: 15
          },
          {
            id: 'diagnoses',
            description: 'Primary and secondary diagnoses with ICD-10 codes',
            fields: ['primary_diagnosis', 'icd10_codes'],
            weight: 15
          },
          {
            id: 'face_to_face',
            description: 'Face-to-face encounter documentation',
            fields: ['encounter_date', 'encounter_provider'],
            weight: 20
          },
          {
            id: 'functional_limitations',
            description: 'Functional limitations and activity restrictions',
            fields: ['mobility_status', 'adl_limitations', 'safety_measures'],
            weight: 10
          },
          {
            id: 'orders',
            description: 'Specific physician orders for services',
            fields: ['service_type', 'frequency', 'duration'],
            weight: 15
          },
          {
            id: 'goals',
            description: 'Measurable treatment goals',
            fields: ['short_term_goals', 'long_term_goals'],
            weight: 10
          },
          {
            id: 'medications',
            description: 'Current medications list',
            fields: ['medication_list', 'dosages'],
            weight: 5
          }
        ]
      },
      'pt-eval': {
        name: 'Physical Therapy Evaluation',
        requiredElements: [
          {
            id: 'referral',
            description: 'Physician referral and orders',
            fields: ['referral_date', 'referring_physician', 'diagnosis'],
            weight: 15
          },
          {
            id: 'history',
            description: 'Medical history and prior level of function',
            fields: ['medical_history', 'prior_function', 'onset_date'],
            weight: 10
          },
          {
            id: 'subjective',
            description: 'Subjective assessment and patient goals',
            fields: ['chief_complaint', 'patient_goals', 'pain_assessment'],
            weight: 10
          },
          {
            id: 'objective',
            description: 'Objective measurements and tests',
            fields: ['rom', 'strength', 'balance', 'gait', 'functional_tests'],
            weight: 20
          },
          {
            id: 'assessment',
            description: 'Clinical assessment and interpretation',
            fields: ['clinical_impression', 'rehab_potential', 'barriers'],
            weight: 15
          },
          {
            id: 'plan',
            description: 'Treatment plan with frequency and duration',
            fields: ['interventions', 'frequency', 'duration', 'goals'],
            weight: 15
          },
          {
            id: 'medical_necessity',
            description: 'Medical necessity justification',
            fields: ['skilled_need', 'complexity', 'safety_concerns'],
            weight: 15
          }
        ]
      },
      'progress': {
        name: 'Progress Note',
        requiredElements: [
          {
            id: 'visit_info',
            description: 'Visit date, time, and duration',
            fields: ['date', 'time_in', 'time_out', 'total_time'],
            weight: 10
          },
          {
            id: 'subjective',
            description: 'Patient report and subjective findings',
            fields: ['patient_report', 'pain_level', 'functional_status'],
            weight: 15
          },
          {
            id: 'objective',
            description: 'Objective findings and measurements',
            fields: ['vital_signs', 'assessment_data', 'performance'],
            weight: 20
          },
          {
            id: 'interventions',
            description: 'Skilled interventions provided',
            fields: ['therapeutic_activities', 'patient_education', 'skilled_services'],
            weight: 20
          },
          {
            id: 'response',
            description: 'Patient response to treatment',
            fields: ['tolerance', 'progress', 'complications'],
            weight: 15
          },
          {
            id: 'plan',
            description: 'Plan for next visit',
            fields: ['next_visit_plan', 'frequency_changes', 'goal_updates'],
            weight: 10
          },
          {
            id: 'medical_necessity',
            description: 'Continued medical necessity',
            fields: ['skilled_need_ongoing', 'progress_justification'],
            weight: 10
          }
        ]
      }
    };

    this.medicalNecessityKeywords = [
      'skilled', 'professional', 'complex', 'safety', 'risk',
      'requires', 'necessary', 'essential', 'specialized',
      'supervision', 'assessment', 'judgment', 'expertise',
      'modification', 'progression', 'regression', 'complications'
    ];
  }

  // Validate document compliance
  validateDocument(document, documentType) {
    const rules = this.complianceRules[documentType];
    if (!rules) {
      return {
        isCompliant: false,
        score: 0,
        issues: ['Unknown document type'],
        recommendations: []
      };
    }

    let totalScore = 0;
    let maxScore = 0;
    const issues = [];
    const recommendations = [];
    const detailedResults = [];

    // Check each required element
    for (const element of rules.requiredElements) {
      const elementResult = this.checkElement(document, element);
      totalScore += elementResult.score * element.weight;
      maxScore += element.weight;

      detailedResults.push({
        element: element.description,
        score: elementResult.score,
        weight: element.weight,
        missing: elementResult.missingFields
      });

      if (elementResult.score < 1) {
        issues.push(`Incomplete ${element.description}`);
        if (elementResult.missingFields.length > 0) {
          recommendations.push(
            `Add missing information for: ${elementResult.missingFields.join(', ')}`
          );
        }
      }
    }

    // Check medical necessity language
    const medicalNecessityScore = this.checkMedicalNecessity(document);
    if (medicalNecessityScore < 0.8) {
      issues.push('Insufficient medical necessity documentation');
      recommendations.push('Include more skilled care justification language');
    }

    // Calculate final compliance score
    const complianceScore = Math.round((totalScore / maxScore) * 100);
    const isCompliant = complianceScore >= 85 && issues.length === 0;

    // Add specific recommendations based on score
    if (complianceScore < 70) {
      recommendations.unshift('Major revisions needed to meet CMS requirements');
    } else if (complianceScore < 85) {
      recommendations.unshift('Minor additions needed for full compliance');
    }

    return {
      isCompliant,
      score: complianceScore,
      issues,
      recommendations,
      detailedResults,
      documentType: rules.name
    };
  }

  // Check individual compliance element
  checkElement(document, element) {
    const missingFields = [];
    let foundFields = 0;

    // Check for required fields in document content
    for (const field of element.fields) {
      if (this.fieldExists(document, field)) {
        foundFields++;
      } else {
        missingFields.push(this.formatFieldName(field));
      }
    }

    const score = element.fields.length > 0 
      ? foundFields / element.fields.length 
      : 0;

    return {
      score,
      missingFields
    };
  }

  // Check if field exists in document
  fieldExists(document, fieldName) {
    const content = JSON.stringify(document.content).toLowerCase();
    const fieldPatterns = {
      'name': /patient\s*name|name:/i,
      'dob': /date\s*of\s*birth|dob:|birth\s*date/i,
      'medicare_number': /medicare|hic\s*number|medicare\s*id/i,
      'physician_name': /physician|doctor|md|attending/i,
      'diagnosis': /diagnosis|diagnoses|dx:/i,
      'medications': /medications?|meds?|rx:/i,
      'goals': /goals?|objectives?/i,
      'frequency': /frequency|times?\s*per\s*week|visits?\s*per/i,
      'duration': /duration|weeks?|months?|episode/i
    };

    const pattern = fieldPatterns[fieldName] || new RegExp(fieldName, 'i');
    return pattern.test(content);
  }

  // Check medical necessity language
  checkMedicalNecessity(document) {
    const content = JSON.stringify(document.content).toLowerCase();
    let keywordCount = 0;

    for (const keyword of this.medicalNecessityKeywords) {
      if (content.includes(keyword.toLowerCase())) {
        keywordCount++;
      }
    }

    return Math.min(keywordCount / 10, 1); // Normalize to 0-1
  }

  // Format field name for display
  formatFieldName(fieldName) {
    return fieldName
      .replace(/_/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  }

  // Get compliance tips for document type
  getComplianceTips(documentType) {
    const tips = {
      'poc': [
        'Ensure face-to-face encounter is documented within required timeframe',
        'Include specific, measurable goals with target dates',
        'Document all physician orders clearly with frequency and duration',
        'List all diagnoses with corresponding ICD-10 codes',
        'Include homebound status justification if applicable'
      ],
      'pt-eval': [
        'Document objective measurements for all tested areas',
        'Include standardized test results when applicable',
        'Clearly state why skilled PT services are required',
        'Set functional, measurable goals with timeframes',
        'Document safety concerns and fall risk assessment'
      ],
      'progress': [
        'Document specific skilled interventions provided',
        'Include patient response and tolerance to treatment',
        'Update progress toward established goals',
        'Justify continued need for skilled services',
        'Note any changes in plan or frequency'
      ]
    };

    return tips[documentType] || tips['progress'];
  }

  // Auto-fix common compliance issues
  autoFixCompliance(document, issues) {
    const fixedDocument = JSON.parse(JSON.stringify(document));
    
    for (const issue of issues) {
      if (issue.includes('medical necessity')) {
        // Add medical necessity language
        this.addMedicalNecessityLanguage(fixedDocument);
      }
      if (issue.includes('goals')) {
        // Enhance goal documentation
        this.enhanceGoals(fixedDocument);
      }
      if (issue.includes('frequency')) {
        // Add frequency/duration if missing
        this.addFrequencyDuration(fixedDocument);
      }
    }

    return fixedDocument;
  }

  // Add medical necessity language to document
  addMedicalNecessityLanguage(document) {
    const necessityStatements = [
      'Skilled therapy services are medically necessary due to',
      'Patient requires professional supervision for safety',
      'Complex medical conditions necessitate skilled intervention',
      'Specialized knowledge and judgment required for'
    ];

    // Add to appropriate sections
    if (document.content.sections) {
      for (const section of document.content.sections) {
        if (section.title.includes('Assessment') || section.title.includes('Plan')) {
          section.content += '\n\n' + necessityStatements[0] + ' the complexity of the patient\'s condition and need for skilled assessment and intervention.';
        }
      }
    }
  }

  // Enhance goal documentation
  enhanceGoals(document) {
    if (document.content.sections) {
      for (const section of document.content.sections) {
        if (section.title.includes('Goals')) {
          section.content = this.convertToSMARTGoals(section.content);
        }
      }
    }
  }

  // Convert goals to SMART format
  convertToSMARTGoals(goalText) {
    // This would use more sophisticated NLP in production
    const enhancedGoals = goalText.replace(
      /improve\s+(\w+)/gi,
      'Improve $1 by 25% as measured by standardized assessment within 4 weeks'
    );
    
    return enhancedGoals;
  }

  // Add frequency and duration
  addFrequencyDuration(document) {
    const defaultFrequency = '3x per week for 4 weeks';
    
    if (document.content.sections) {
      for (const section of document.content.sections) {
        if (section.title.includes('Plan') || section.title.includes('Orders')) {
          if (!section.content.includes('week')) {
            section.content += `\n\nFrequency and Duration: ${defaultFrequency}`;
          }
        }
      }
    }
  }
}

// Export singleton instance
export default new ComplianceEngine();