import React from 'react';

// Clinical Parser - AI-powered clinical data extraction
export class ClinicalParser {
  constructor() {
    this.patterns = {
      vitals: {
        bloodPressure: /(?:BP|blood pressure)[:\s]*(\d{2,3})\/(\d{2,3})/gi,
        heartRate: /(?:HR|heart rate|pulse)[:\s]*(\d{2,3})/gi,
        temperature: /(?:temp|temperature)[:\s]*(\d{2,3}\.?\d?)/gi,
        oxygen: /(?:O2|oxygen|SpO2)[:\s]*(\d{2,3})%?/gi,
        respiratoryRate: /(?:RR|respiratory rate)[:\s]*(\d{1,2})/gi,
        weight: /(?:weight|wt)[:\s]*(\d{2,3}\.?\d?)\s*(?:lbs?|pounds?|kg)?/gi
      },
      functionalStatus: {
        ambulation: /(?:ambulation|ambulates?|walking|walks?|gait)[:\s]*([^.]+\.)/gi,
        transfers: /(?:transfers?|transferring)[:\s]*([^.]+\.)/gi,
        adls: /(?:ADLs?|activities of daily living)[:\s]*([^.]+\.)/gi,
        mobility: /(?:mobility|mobile)[:\s]*([^.]+\.)/gi,
        balance: /(?:balance|stability)[:\s]*([^.]+\.)/gi
      },
      medications: {
        medication: /(?:medication|med|rx)[:\s]*([A-Za-z]+)\s*(\d+\.?\d*\s*mg)/gi,
        newMed: /(?:started|initiated|began)\s+([A-Za-z]+)\s*(\d+\.?\d*\s*mg)/gi,
        discontinued: /(?:discontinued|stopped|d\/c)\s+([A-Za-z]+)/gi
      },
      interventions: {
        therapeutic: /(?:performed|provided|completed)\s+([^.]+(?:exercise|therapy|training|education))/gi,
        skilled: /(?:skilled|professional)\s+([^.]+(?:assessment|intervention|service))/gi,
        education: /(?:educated|instructed|taught)\s+(?:patient|caregiver)\s+(?:on|about|regarding)\s+([^.]+)/gi
      },
      goals: {
        shortTerm: /(?:STG|short[\s-]?term goal)[:\s]*([^.]+\.)/gi,
        longTerm: /(?:LTG|long[\s-]?term goal)[:\s]*([^.]+\.)/gi,
        progress: /(?:progress|progressed?|improvement)\s+(?:toward|in)\s+([^.]+)/gi
      },
      safety: {
        fallRisk: /(?:fall risk|risk of falls?)[:\s]*([^.]+\.)/gi,
        precautions: /(?:precautions?|safety measures?)[:\s]*([^.]+\.)/gi,
        equipment: /(?:DME|equipment|device)\s+(?:needed|required|recommended)[:\s]*([^.]+\.)/gi
      }
    };
  }

  // Parse clinical notes and extract structured data
  parseNotes(notes) {
    const extractedData = {
      vitals: {},
      functionalStatus: {},
      medications: [],
      interventions: [],
      goals: {
        shortTerm: [],
        longTerm: []
      },
      safety: {},
      progress: [],
      complications: [],
      patientResponse: []
    };

    // Combine all notes into one text for parsing
    const combinedText = notes.map(note => note.content).join('\n');

    // Extract vital signs
    extractedData.vitals = this.extractVitals(combinedText);

    // Extract functional status
    extractedData.functionalStatus = this.extractFunctionalStatus(combinedText);

    // Extract medications
    extractedData.medications = this.extractMedications(combinedText);

    // Extract interventions
    extractedData.interventions = this.extractInterventions(combinedText);

    // Extract goals and progress
    const goalsData = this.extractGoals(combinedText);
    extractedData.goals = goalsData.goals;
    extractedData.progress = goalsData.progress;

    // Extract safety information
    extractedData.safety = this.extractSafety(combinedText);

    // Extract patient response
    extractedData.patientResponse = this.extractPatientResponse(combinedText);

    // Extract complications
    extractedData.complications = this.extractComplications(combinedText);

    return extractedData;
  }

  extractVitals(text) {
    const vitals = {};

    // Blood Pressure
    const bpMatch = text.match(this.patterns.vitals.bloodPressure);
    if (bpMatch) {
      const match = bpMatch[0].match(/(\d{2,3})\/(\d{2,3})/);
      if (match) {
        vitals.bloodPressure = {
          systolic: parseInt(match[1]),
          diastolic: parseInt(match[2]),
          reading: `${match[1]}/${match[2]}`
        };
      }
    }

    // Heart Rate
    const hrMatch = text.match(this.patterns.vitals.heartRate);
    if (hrMatch) {
      const match = hrMatch[0].match(/(\d{2,3})/);
      if (match) {
        vitals.heartRate = parseInt(match[1]);
      }
    }

    // Temperature
    const tempMatch = text.match(this.patterns.vitals.temperature);
    if (tempMatch) {
      const match = tempMatch[0].match(/(\d{2,3}\.?\d?)/);
      if (match) {
        vitals.temperature = parseFloat(match[1]);
      }
    }

    // Oxygen Saturation
    const o2Match = text.match(this.patterns.vitals.oxygen);
    if (o2Match) {
      const match = o2Match[0].match(/(\d{2,3})/);
      if (match) {
        vitals.oxygenSaturation = parseInt(match[1]);
      }
    }

    // Respiratory Rate
    const rrMatch = text.match(this.patterns.vitals.respiratoryRate);
    if (rrMatch) {
      const match = rrMatch[0].match(/(\d{1,2})/);
      if (match) {
        vitals.respiratoryRate = parseInt(match[1]);
      }
    }

    // Weight
    const weightMatch = text.match(this.patterns.vitals.weight);
    if (weightMatch) {
      const match = weightMatch[0].match(/(\d{2,3}\.?\d?)/);
      if (match) {
        vitals.weight = parseFloat(match[1]);
      }
    }

    return vitals;
  }

  extractFunctionalStatus(text) {
    const status = {};

    // Ambulation
    const ambMatch = text.match(this.patterns.functionalStatus.ambulation);
    if (ambMatch) {
      status.ambulation = this.cleanExtractedText(ambMatch[1]);
    }

    // Transfers
    const transferMatch = text.match(this.patterns.functionalStatus.transfers);
    if (transferMatch) {
      status.transfers = this.cleanExtractedText(transferMatch[1]);
    }

    // ADLs
    const adlMatch = text.match(this.patterns.functionalStatus.adls);
    if (adlMatch) {
      status.adls = this.cleanExtractedText(adlMatch[1]);
    }

    // Mobility
    const mobilityMatch = text.match(this.patterns.functionalStatus.mobility);
    if (mobilityMatch) {
      status.mobility = this.cleanExtractedText(mobilityMatch[1]);
    }

    // Balance
    const balanceMatch = text.match(this.patterns.functionalStatus.balance);
    if (balanceMatch) {
      status.balance = this.cleanExtractedText(balanceMatch[1]);
    }

    return status;
  }

  extractMedications(text) {
    const medications = [];
    
    // Current medications
    const medMatches = text.matchAll(this.patterns.medications.medication);
    for (const match of medMatches) {
      medications.push({
        name: match[1],
        dose: match[2],
        status: 'current'
      });
    }

    // New medications
    const newMedMatches = text.matchAll(this.patterns.medications.newMed);
    for (const match of newMedMatches) {
      medications.push({
        name: match[1],
        dose: match[2],
        status: 'new'
      });
    }

    // Discontinued medications
    const dcMatches = text.matchAll(this.patterns.medications.discontinued);
    for (const match of dcMatches) {
      medications.push({
        name: match[1],
        status: 'discontinued'
      });
    }

    return medications;
  }

  extractInterventions(text) {
    const interventions = [];

    // Therapeutic interventions
    const therapyMatches = text.matchAll(this.patterns.interventions.therapeutic);
    for (const match of therapyMatches) {
      interventions.push({
        type: 'therapeutic',
        description: this.cleanExtractedText(match[1])
      });
    }

    // Skilled interventions
    const skilledMatches = text.matchAll(this.patterns.interventions.skilled);
    for (const match of skilledMatches) {
      interventions.push({
        type: 'skilled',
        description: this.cleanExtractedText(match[1])
      });
    }

    // Education
    const educationMatches = text.matchAll(this.patterns.interventions.education);
    for (const match of educationMatches) {
      interventions.push({
        type: 'education',
        description: this.cleanExtractedText(match[1])
      });
    }

    return interventions;
  }

  extractGoals(text) {
    const goals = {
      shortTerm: [],
      longTerm: []
    };
    const progress = [];

    // Short-term goals
    const stgMatches = text.matchAll(this.patterns.goals.shortTerm);
    for (const match of stgMatches) {
      goals.shortTerm.push(this.cleanExtractedText(match[1]));
    }

    // Long-term goals
    const ltgMatches = text.matchAll(this.patterns.goals.longTerm);
    for (const match of ltgMatches) {
      goals.longTerm.push(this.cleanExtractedText(match[1]));
    }

    // Progress
    const progressMatches = text.matchAll(this.patterns.goals.progress);
    for (const match of progressMatches) {
      progress.push(this.cleanExtractedText(match[1]));
    }

    return { goals, progress };
  }

  extractSafety(text) {
    const safety = {};

    // Fall risk
    const fallRiskMatch = text.match(this.patterns.safety.fallRisk);
    if (fallRiskMatch) {
      safety.fallRisk = this.cleanExtractedText(fallRiskMatch[1]);
    }

    // Precautions
    const precautionsMatch = text.match(this.patterns.safety.precautions);
    if (precautionsMatch) {
      safety.precautions = this.cleanExtractedText(precautionsMatch[1]);
    }

    // Equipment needs
    const equipmentMatch = text.match(this.patterns.safety.equipment);
    if (equipmentMatch) {
      safety.equipmentNeeds = this.cleanExtractedText(equipmentMatch[1]);
    }

    return safety;
  }

  extractPatientResponse(text) {
    const responses = [];
    
    // Common patient response patterns
    const responsePatterns = [
      /patient\s+(?:reported|stated|expressed)\s+([^.]+)/gi,
      /patient\s+(?:tolerated|responded)\s+([^.]+)\s+(?:well|poorly|with)/gi,
      /patient\s+(?:demonstrated|showed)\s+([^.]+)/gi
    ];

    for (const pattern of responsePatterns) {
      const matches = text.matchAll(pattern);
      for (const match of matches) {
        responses.push(this.cleanExtractedText(match[1]));
      }
    }

    return responses;
  }

  extractComplications(text) {
    const complications = [];
    
    // Common complication patterns
    const complicationPatterns = [
      /(?:complication|adverse event|issue)\s*:\s*([^.]+)/gi,
      /patient\s+(?:experienced|developed|had)\s+([^.]+(?:pain|discomfort|difficulty))/gi,
      /(?:unable to|could not|difficulty with)\s+([^.]+)/gi
    ];

    for (const pattern of complicationPatterns) {
      const matches = text.matchAll(pattern);
      for (const match of matches) {
        complications.push(this.cleanExtractedText(match[1]));
      }
    }

    return complications;
  }

  // Clean and normalize extracted text
  cleanExtractedText(text) {
    return text
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/[,;]$/, '')
      .replace(/\.$/, '');
  }

  // Generate summary from extracted data
  generateSummary(extractedData) {
    const summary = {
      clinicalStatus: '',
      keyFindings: [],
      recommendations: []
    };

    // Clinical status summary
    if (extractedData.functionalStatus.ambulation) {
      summary.clinicalStatus += `Ambulation: ${extractedData.functionalStatus.ambulation}. `;
    }
    if (extractedData.functionalStatus.transfers) {
      summary.clinicalStatus += `Transfers: ${extractedData.functionalStatus.transfers}. `;
    }

    // Key findings
    if (extractedData.vitals.bloodPressure) {
      summary.keyFindings.push(`BP: ${extractedData.vitals.bloodPressure.reading}`);
    }
    if (extractedData.progress.length > 0) {
      summary.keyFindings.push(`Progress noted in: ${extractedData.progress[0]}`);
    }

    // Recommendations based on findings
    if (extractedData.safety.fallRisk) {
      summary.recommendations.push('Continue fall prevention measures');
    }
    if (extractedData.interventions.length > 0) {
      summary.recommendations.push('Continue current intervention plan');
    }

    return summary;
  }
}

// Export a singleton instance
export default new ClinicalParser();