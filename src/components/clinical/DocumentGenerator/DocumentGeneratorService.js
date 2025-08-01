// Document Generator Service - Integration with EMR
import ClinicalParser from '../Intelligence/ClinicalParser';
import ComplianceEngine from '../Intelligence/ComplianceEngine';
import GoalGenerator from '../Intelligence/GoalGenerator';
import MedicalNecessityValidator from '../Intelligence/MedicalNecessityValidator';

class DocumentGeneratorService {
  constructor() {
    this.parser = ClinicalParser;
    this.compliance = ComplianceEngine;
    this.goalGenerator = GoalGenerator;
    this.necessityValidator = MedicalNecessityValidator;
  }

  // Generate document from clinical data
  async generateDocument(documentRequest) {
    try {
      // Step 1: Parse clinical data
      const parsedData = this.parser.parseNotes(documentRequest.sourceData.visitNotes);
      
      // Step 2: Generate goals based on assessment
      const goals = this.goalGenerator.generateGoals(
        parsedData,
        documentRequest.documentType
      );
      
      // Step 3: Create document structure
      const document = this.createDocumentStructure(
        documentRequest,
        parsedData,
        goals
      );
      
      // Step 4: Validate compliance
      const complianceStatus = this.compliance.validateDocument(
        document,
        documentRequest.documentType
      );
      
      // Step 5: Validate medical necessity
      const necessityValidation = this.necessityValidator.validateMedicalNecessity(
        document,
        'medicare'
      );
      
      // Step 6: Enhance document if needed
      let finalDocument = document;
      if (!complianceStatus.isCompliant || necessityValidation.score < 75) {
        finalDocument = this.enhanceDocument(
          document,
          complianceStatus,
          necessityValidation
        );
      }
      
      return {
        success: true,
        document: finalDocument,
        complianceStatus,
        necessityValidation,
        generationTime: new Date().toISOString()
      };
    } catch (error) {
      console.error('Document generation error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Create document structure based on type
  createDocumentStructure(request, parsedData, goals) {
    const documentTemplates = {
      'poc': this.createPlanOfCare,
      'pt-eval': this.createPTEvaluation,
      'ot-eval': this.createOTEvaluation,
      'st-eval': this.createSTEvaluation,
      'progress': this.createProgressNote,
      'discharge': this.createDischargeSummary
    };

    const templateFunction = documentTemplates[request.documentType] || this.createProgressNote;
    return templateFunction.call(this, request, parsedData, goals);
  }

  // Create Plan of Care document
  createPlanOfCare(request, parsedData, goals) {
    return {
      id: `poc-${Date.now()}`,
      type: 'Plan of Care',
      patientId: request.patientId,
      content: {
        header: {
          facilityName: 'Village Home Care',
          documentType: 'Plan of Care (CMS 485)',
          patientName: 'Patient Name',
          mrn: request.patientId,
          dob: '01/01/1950',
          documentDate: new Date().toISOString().split('T')[0]
        },
        sections: [
          {
            title: 'Patient Information',
            content: this.generatePatientInfoSection(request, parsedData)
          },
          {
            title: 'Medical History and Diagnoses',
            content: this.generateMedicalHistorySection(request, parsedData)
          },
          {
            title: 'Functional Limitations',
            content: this.generateFunctionalLimitationsSection(parsedData)
          },
          {
            title: 'Treatment Goals',
            content: this.generateGoalsSection(goals)
          },
          {
            title: 'Treatment Plan',
            content: this.generateTreatmentPlanSection(request, parsedData)
          },
          {
            title: 'Safety Measures',
            content: this.generateSafetySection(parsedData)
          },
          {
            title: 'Medications',
            content: this.generateMedicationsSection(parsedData)
          },
          {
            title: 'Medical Necessity',
            content: this.generateMedicalNecessitySection(parsedData)
          }
        ],
        signature: {
          preparedBy: 'System Generated',
          preparedDate: new Date().toISOString(),
          requiresPhysicianSignature: true
        }
      }
    };
  }

  // Create PT Evaluation document
  createPTEvaluation(request, parsedData, goals) {
    return {
      id: `pt-eval-${Date.now()}`,
      type: 'PT Evaluation',
      patientId: request.patientId,
      content: {
        header: {
          facilityName: 'Village Home Care',
          documentType: 'Physical Therapy Initial Evaluation',
          patientName: 'Patient Name',
          mrn: request.patientId,
          dob: '01/01/1950',
          documentDate: new Date().toISOString().split('T')[0]
        },
        sections: [
          {
            title: 'Referral Information',
            content: this.generateReferralSection(request)
          },
          {
            title: 'Medical History',
            content: this.generateMedicalHistorySection(request, parsedData)
          },
          {
            title: 'Subjective',
            content: this.generateSubjectiveSection(parsedData)
          },
          {
            title: 'Objective',
            content: this.generateObjectiveSection(parsedData)
          },
          {
            title: 'Assessment',
            content: this.generateAssessmentSection(parsedData, goals)
          },
          {
            title: 'Plan',
            content: this.generatePlanSection(goals, request)
          },
          {
            title: 'Medical Necessity',
            content: this.generateMedicalNecessitySection(parsedData)
          }
        ],
        signature: {
          preparedBy: 'System Generated',
          preparedDate: new Date().toISOString(),
          requiresTherapistSignature: true
        }
      }
    };
  }

  // Create Progress Note document
  createProgressNote(request, parsedData, goals) {
    return {
      id: `progress-${Date.now()}`,
      type: 'Progress Note',
      patientId: request.patientId,
      content: {
        header: {
          facilityName: 'Village Home Care',
          documentType: 'Therapy Progress Note',
          patientName: 'Patient Name',
          mrn: request.patientId,
          dob: '01/01/1950',
          documentDate: new Date().toISOString().split('T')[0],
          visitDate: new Date().toISOString().split('T')[0],
          timeIn: '09:00 AM',
          timeOut: '10:00 AM',
          duration: '60 minutes'
        },
        sections: [
          {
            title: 'Subjective',
            content: this.generateProgressSubjective(parsedData)
          },
          {
            title: 'Objective',
            content: this.generateProgressObjective(parsedData)
          },
          {
            title: 'Interventions Provided',
            content: this.generateInterventionsSection(parsedData)
          },
          {
            title: 'Patient Response',
            content: this.generatePatientResponseSection(parsedData)
          },
          {
            title: 'Progress Toward Goals',
            content: this.generateProgressSection(parsedData, goals)
          },
          {
            title: 'Plan',
            content: this.generateNextVisitPlan(parsedData)
          },
          {
            title: 'Medical Necessity',
            content: this.generateContinuedNecessity(parsedData)
          }
        ],
        signature: {
          preparedBy: 'System Generated',
          preparedDate: new Date().toISOString(),
          requiresTherapistSignature: true
        }
      }
    };
  }

  // Section generators
  generatePatientInfoSection(request, parsedData) {
    return `Patient Name: [Patient Name]
MRN: ${request.patientId}
Date of Birth: [DOB]
Address: [Patient Address]
Phone: [Phone Number]
Insurance: Medicare Part A/B
Medicare Number: [Medicare ID]
Secondary Insurance: [If applicable]

Emergency Contact: [Name and Phone]
Primary Physician: [Physician Name, MD]
Physician Phone: [Phone Number]
Physician NPI: [NPI Number]`;
  }

  generateMedicalHistorySection(request, parsedData) {
    const diagnoses = request.sourceData.assessmentData?.diagnoses || [];
    return `Primary Diagnosis: ${diagnoses[0] || '[Primary Diagnosis]'} - ICD-10: [Code]
Secondary Diagnoses:
${diagnoses.slice(1).map((dx, i) => `${i + 1}. ${dx} - ICD-10: [Code]`).join('\n') || '1. [Secondary Diagnosis] - ICD-10: [Code]'}

Relevant Medical History:
• Recent hospitalization for [condition] on [date]
• Past medical history significant for [conditions]
• Surgical history: [procedures]

Current Medical Status:
${parsedData.functionalStatus.mobility || 'Patient presents with decreased mobility and functional limitations requiring skilled therapy intervention.'}`;
  }

  generateFunctionalLimitationsSection(parsedData) {
    const status = parsedData.functionalStatus;
    return `Mobility: ${status.ambulation || 'Requires assistance for ambulation'}
Transfers: ${status.transfers || 'Requires supervision for safe transfers'}
ADLs: ${status.adls || 'Requires assistance with ADLs'}
Balance: ${status.balance || 'Impaired balance with increased fall risk'}

Activity Restrictions:
• Weight bearing status: [As ordered]
• Activity tolerance: Limited to [duration/distance]
• Cognitive status: ${parsedData.cognition || 'Alert and oriented x3'}

Safety Considerations:
${parsedData.safety.fallRisk || '• High fall risk due to impaired balance and decreased strength'}
${parsedData.safety.precautions || '• Requires supervision for mobility and transfers'}`;
  }

  generateGoalsSection(goals) {
    const shortTermGoals = goals.shortTerm.map((goal, i) => 
      `${i + 1}. ${goal.goal}`
    ).join('\n');
    
    const longTermGoals = goals.longTerm.map((goal, i) => 
      `${i + 1}. ${goal.goal}`
    ).join('\n');

    return `Short-Term Goals (2-4 weeks):
${shortTermGoals || '1. Patient will ambulate 50 feet with rolling walker and contact guard assist within 2 weeks'}

Long-Term Goals (60-90 days):
${longTermGoals || '1. Patient will ambulate independently with appropriate device for all household distances within 8 weeks'}

Discharge Goals:
${goals.discharge.map(g => `• ${g.goal}`).join('\n') || '• Return to prior level of function with independence in mobility and ADLs'}`;
  }

  generateTreatmentPlanSection(request, parsedData) {
    return `Disciplines and Treatment:
Physical Therapy: Evaluation and treatment 3x/week x 4 weeks, then 2x/week x 4 weeks
• Therapeutic exercise for strengthening
• Gait training and balance activities
• Transfer training
• Patient/caregiver education
• Home exercise program instruction

Occupational Therapy: Evaluation and treatment 2x/week x 4 weeks
• ADL retraining
• Adaptive equipment training
• Energy conservation techniques
• Home safety evaluation

Skilled Nursing: 1x/week x 8 weeks
• Medication management and education
• Vital sign monitoring
• Wound care if applicable
• Disease process education

Duration: 60-day certification period
Frequency may be adjusted based on patient progress and medical necessity`;
  }

  generateSafetySection(parsedData) {
    return `Fall Prevention Measures:
• Remove throw rugs and clutter from walkways
• Install grab bars in bathroom
• Ensure adequate lighting throughout home
• Use prescribed assistive device at all times
• Wear non-slip footwear

Equipment Needs:
${parsedData.safety.equipmentNeeds || '• Rolling walker with seat\n• Shower chair\n• Grab bars for bathroom\n• Raised toilet seat'}

Precautions:
${parsedData.safety.precautions || '• Contact guard assistance for transfers\n• No unsupervised ambulation until cleared by PT\n• Call for assistance when needed'}`;
  }

  generateMedicationsSection(parsedData) {
    const meds = parsedData.medications || [];
    if (meds.length > 0) {
      return meds.map(med => 
        `${med.name} ${med.dose || ''} - ${med.status}`
      ).join('\n');
    }
    
    return `Current Medications:
1. [Medication Name] [Dose] [Frequency] - [Indication]
2. [Medication Name] [Dose] [Frequency] - [Indication]
3. [Medication Name] [Dose] [Frequency] - [Indication]

Allergies: [List allergies or NKDA]`;
  }

  generateMedicalNecessitySection(parsedData) {
    return `Medical Necessity Justification:

Due to the complexity of the patient's medical condition and significant functional limitations, skilled therapy services are medically necessary to:

1. Ensure safe functional mobility and prevent falls
2. Restore independence with activities of daily living
3. Provide specialized therapeutic interventions requiring professional expertise
4. Monitor and modify treatment based on patient's variable medical status
5. Educate patient and caregivers on safe techniques and precautions

The patient requires the skills of a qualified therapist due to the complexity of the rehabilitation needs and the need for ongoing assessment and treatment modification. Non-skilled care would not be sufficient to address the patient's needs safely and effectively.

Homebound Status: Patient is homebound due to the considerable and taxing effort required to leave home. Absences from home are infrequent and for medical appointments only.`;
  }

  // Enhance document with compliance and medical necessity
  enhanceDocument(document, complianceStatus, necessityValidation) {
    let enhanced = JSON.parse(JSON.stringify(document));
    
    // Auto-fix compliance issues
    if (!complianceStatus.isCompliant) {
      enhanced = this.compliance.autoFixCompliance(enhanced, complianceStatus.issues);
    }
    
    // Enhance medical necessity
    if (necessityValidation.score < 75) {
      enhanced = this.necessityValidator.enhanceDocument(enhanced, necessityValidation);
    }
    
    return enhanced;
  }

  // Additional section generators for different document types
  generateReferralSection(request) {
    return `Referral Date: ${new Date().toISOString().split('T')[0]}
Referring Physician: [Physician Name, MD]
Referral Diagnosis: [Primary Diagnosis]
Orders: Physical Therapy evaluation and treatment

Reason for Referral:
Patient recently discharged from [Hospital] following [condition/procedure]. Physician has ordered home health physical therapy for evaluation and treatment to address functional deficits and ensure safe mobility at home.`;
  }

  generateSubjectiveSection(parsedData) {
    return `Chief Complaint: "I have difficulty walking and feel unsteady"

History of Present Illness:
${parsedData.patientResponse[0] || 'Patient reports decreased mobility and increased difficulty with daily activities following recent hospitalization.'}

Prior Level of Function:
Patient reports being independent with all mobility and ADLs prior to recent medical event.

Patient Goals:
• Return to independent walking
• Be able to care for self at home
• Prevent falls

Pain Assessment:
Location: [Location]
Intensity: [0-10 scale]
Quality: [Description]
Aggravating Factors: [Activities that increase pain]
Relieving Factors: [What helps]`;
  }

  generateObjectiveSection(parsedData) {
    const vitals = parsedData.vitals || {};
    return `Vital Signs:
BP: ${vitals.bloodPressure?.reading || '[BP]'}
HR: ${vitals.heartRate || '[HR]'} bpm
O2 Sat: ${vitals.oxygenSaturation || '[O2]'}%
Temperature: ${vitals.temperature || '[Temp]'}°F

Observation:
• Alert and oriented x3
• Cooperative with assessment
• Motivated to participate

Range of Motion:
• [Joint]: [Measurements]

Strength (Manual Muscle Testing):
• [Muscle Group]: [Grade]/5

Balance Assessment:
• Static Standing: [Results]
• Dynamic Balance: [Results]
• Berg Balance Scale: [Score]/56

Gait Assessment:
${parsedData.functionalStatus.ambulation || 'Patient ambulates with rolling walker, decreased step length, wide base of support'}

Functional Mobility:
• Bed Mobility: [Level of assistance]
• Transfers: ${parsedData.functionalStatus.transfers || 'Minimal assistance'}
• Stairs: [Ability/Unable]`;
  }

  generateAssessmentSection(parsedData, goals) {
    return `Clinical Impression:
Patient presents with significant functional deficits following [diagnosis/event]. Assessment reveals impaired strength, balance, and mobility placing patient at high risk for falls. Patient demonstrates good rehabilitation potential based on motivation and cognitive status.

Key Findings:
• Decreased lower extremity strength
• Impaired static and dynamic balance
• Reduced functional mobility
• High fall risk
• Good cognitive status and motivation

Rehabilitation Potential: Good

Skilled PT services are medically necessary to address identified deficits, ensure safety, and progress patient toward functional independence.`;
  }

  generatePlanSection(goals, request) {
    return `Frequency and Duration:
PT 3x/week x 4 weeks, then 2x/week x 4 weeks for total of 8 weeks

Treatment Interventions:
1. Therapeutic Exercise
   • Progressive strengthening exercises
   • Range of motion activities
   • Core stabilization

2. Gait Training
   • Progressive ambulation with appropriate device
   • Correction of gait deviations
   • Endurance training

3. Balance Training
   • Static and dynamic balance activities
   • Fall prevention strategies
   • Proprioceptive training

4. Transfer Training
   • Safe transfer techniques
   • Progressive independence

5. Patient/Caregiver Education
   • Home exercise program
   • Safety awareness
   • Proper body mechanics

Goals:
${goals.shortTerm.map(g => `• ${g.goal}`).join('\n')}

Next Visit: Focus on establishing baseline exercise program and initiating gait training`;
  }

  // Progress note specific sections
  generateProgressSubjective(parsedData) {
    return `Patient reports: "${parsedData.patientResponse[0] || 'Feeling better, able to walk a little farther today'}"

Pain: ${parsedData.pain || '3/10 in lower back with prolonged standing'}
Fatigue Level: Mild
Compliance with HEP: Good - performing exercises 2x daily as instructed

Changes Since Last Visit:
• Improved confidence with walking
• Less assistance needed for transfers
• No falls or near-falls reported`;
  }

  generateProgressObjective(parsedData) {
    return `Vital Signs: WNL

Interventions Provided This Visit:
1. Therapeutic Exercise (20 min)
   • Lower extremity strengthening
   • Core stabilization exercises
   • Flexibility exercises

2. Gait Training (20 min)
   • Ambulated 100 feet with rolling walker and contact guard assist
   • Worked on heel strike and step length
   • Practiced turning and navigating obstacles

3. Balance Activities (15 min)
   • Standing balance with reaching activities
   • Weight shifting exercises
   • Single leg stance with support

4. Patient Education (5 min)
   • Reviewed home exercise program
   • Discussed fall prevention strategies`;
  }

  generateInterventionsSection(parsedData) {
    const interventions = parsedData.interventions || [];
    if (interventions.length > 0) {
      return interventions.map(int => 
        `• ${int.type}: ${int.description}`
      ).join('\n');
    }
    
    return `Skilled Interventions:
• Manual therapy techniques for joint mobility
• Neuromuscular re-education for improved movement patterns
• Skilled assessment and modification of exercise program
• Hands-on facilitation for proper movement patterns
• Clinical decision making for progression of activities`;
  }

  generatePatientResponseSection(parsedData) {
    return `Tolerance to Treatment: Good - no adverse reactions

Patient Performance:
• Demonstrated improved weight shifting during balance activities
• Required fewer verbal cues for proper walker placement
• Maintained proper posture throughout session

Patient Understanding:
• Correctly demonstrated all exercises
• Verbalized understanding of safety precautions
• Asked appropriate questions about progression`;
  }

  generateProgressSection(parsedData, goals) {
    return `Progress Toward STGs:
${goals.shortTerm.map((goal, i) => 
  `${i + 1}. ${goal.goal}\n   Status: Progressing - 50% achieved`
).join('\n')}

Functional Improvements:
• Ambulation distance increased from 50 to 100 feet
• Transfer assist level improved from moderate to minimal
• Standing balance time increased from 30 to 45 seconds

Barriers to Progress:
• Mild fatigue limiting endurance
• Occasional dizziness with position changes`;
  }

  generateNextVisitPlan(parsedData) {
    return `Plan for Next Visit:
• Progress ambulation distance to 150 feet
• Initiate stair training if appropriate
• Continue strengthening progression
• Re-assess need for assistive device modification

Frequency: Continue current frequency of 3x/week

Home Program:
• Continue current HEP 2x daily
• Added standing marching exercise
• Increase walking practice to 3x daily`;
  }

  generateContinuedNecessity(parsedData) {
    return `Continued Medical Necessity:

Skilled PT services remain medically necessary due to:
• Ongoing need for skilled assessment and treatment modification
• Complex rehabilitation needs requiring professional expertise
• Continued fall risk requiring skilled intervention
• Need for progression of therapeutic activities based on patient response

Patient continues to make measurable functional progress toward established goals. Skilled services are essential to maintain gains and achieve independence with mobility and ADLs. Discharge to self-management would result in regression and potential safety risks.`;
  }
}

// Export singleton instance
export default new DocumentGeneratorService();