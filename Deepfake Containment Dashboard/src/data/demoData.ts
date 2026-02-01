export interface ContentCase {
  id: string;
  fileName: string;
  duration: string;
  uploadTime: string;
  uploadSource: string;
  uploaderStatus: string;
  currentViews: number;
  sharesPerMin: number;
  growthVelocity: 'Low' | 'Medium' | 'High';
  status: 'Under Analysis' | 'High Risk' | 'Low Risk' | 'Containment Active';
  
  // Risk Analysis
  facialConsistency: number;
  lipAudioSync: number;
  identityMatch: number;
  metadataIntegrity: 'Low' | 'Medium' | 'High';
  overallRiskScore: number;
  
  // Virality Data
  viralityData: {
    time: number;
    actual: number;
    projected: number;
  }[];
  
  containmentTriggeredAt?: number;
  viewsBeforeContainment?: number;
  viewsAfterContainment?: number;
  projectedWithoutContainment?: number;
  
  // Visual representation
  thumbnailGradient: string;
  thumbnailIcon: 'video' | 'interview' | 'speech' | 'news';
  
  // Containment details
  containmentActions?: {
    amplificationReduced: string;
    reshareFriction: string;
    contextLabel: string;
    evidenceArchived: string;
  };
  
  // Audit timeline
  auditTimeline: {
    time: string;
    event: string;
    type: 'detection' | 'analysis' | 'risk' | 'containment' | 'label' | 'alert';
  }[];
  
  detectionTime: string;
  spreadReduction: string;
  victimNotificationTime: string;
}

export const demoContentCases: ContentCase[] = [
  {
    id: 'case-001',
    fileName: 'interview_clip_final.mp4',
    duration: '00:42',
    uploadTime: '2 minutes ago',
    uploadSource: 'Public social platform',
    uploaderStatus: 'Unverified account',
    currentViews: 1284,
    sharesPerMin: 96,
    growthVelocity: 'High',
    status: 'High Risk',
    
    facialConsistency: 68,
    lipAudioSync: 82,
    identityMatch: 91,
    metadataIntegrity: 'Low',
    overallRiskScore: 87,
    
    viralityData: [
      { time: 0, actual: 0, projected: 0 },
      { time: 1, actual: 420, projected: 450 },
      { time: 2, actual: 890, projected: 950 },
      { time: 3, actual: 1340, projected: 1600 },
      { time: 3.17, actual: 1430, projected: 1750 },
      { time: 4, actual: 1520, projected: 2400 },
      { time: 5, actual: 1580, projected: 3200 },
      { time: 6, actual: 1620, projected: 4100 },
      { time: 7, actual: 1620, projected: 4800 },
    ],
    
    containmentTriggeredAt: 3.17,
    viewsBeforeContainment: 1430,
    viewsAfterContainment: 1620,
    projectedWithoutContainment: 4800,
    
    thumbnailGradient: 'from-red-900 to-orange-900',
    thumbnailIcon: 'interview',
    
    containmentActions: {
      amplificationReduced: '03:10',
      reshareFriction: '03:12',
      contextLabel: '03:15',
      evidenceArchived: '03:18',
    },
    
    auditTimeline: [
      { time: '02:01', event: 'Content detected', type: 'detection' },
      { time: '02:03', event: 'Risk analysis initiated', type: 'analysis' },
      { time: '03:10', event: 'High-risk threshold crossed', type: 'risk' },
      { time: '03:12', event: 'Containment activated', type: 'containment' },
      { time: '03:15', event: 'Context label applied', type: 'label' },
      { time: '03:18', event: 'Victim alert sent', type: 'alert' },
    ],
    
    detectionTime: '2 min 14 sec',
    spreadReduction: '66%',
    victimNotificationTime: '< 4 min',
  },
  
  {
    id: 'case-002',
    fileName: 'political_speech_excerpt.mp4',
    duration: '01:18',
    uploadTime: '8 minutes ago',
    uploadSource: 'Video sharing platform',
    uploaderStatus: 'Anonymous account',
    currentViews: 3847,
    sharesPerMin: 142,
    growthVelocity: 'High',
    status: 'Containment Active',
    
    facialConsistency: 73,
    lipAudioSync: 89,
    identityMatch: 94,
    metadataIntegrity: 'Low',
    overallRiskScore: 92,
    
    viralityData: [
      { time: 0, actual: 0, projected: 0 },
      { time: 1, actual: 580, projected: 600 },
      { time: 2, actual: 1240, projected: 1300 },
      { time: 3, actual: 2100, projected: 2200 },
      { time: 4, actual: 2890, projected: 3400 },
      { time: 4.5, actual: 3280, projected: 4200 },
      { time: 5, actual: 3520, projected: 5200 },
      { time: 6, actual: 3710, projected: 6800 },
      { time: 7, actual: 3820, projected: 8600 },
      { time: 8, actual: 3847, projected: 10400 },
    ],
    
    containmentTriggeredAt: 4.5,
    viewsBeforeContainment: 3280,
    viewsAfterContainment: 3847,
    projectedWithoutContainment: 10400,
    
    thumbnailGradient: 'from-blue-900 to-purple-900',
    thumbnailIcon: 'speech',
    
    containmentActions: {
      amplificationReduced: '04:30',
      reshareFriction: '04:32',
      contextLabel: '04:35',
      evidenceArchived: '04:38',
    },
    
    auditTimeline: [
      { time: '00:42', event: 'Content detected', type: 'detection' },
      { time: '00:48', event: 'Risk analysis initiated', type: 'analysis' },
      { time: '04:30', event: 'High-risk threshold crossed', type: 'risk' },
      { time: '04:32', event: 'Containment activated', type: 'containment' },
      { time: '04:35', event: 'Context label applied', type: 'label' },
      { time: '04:38', event: 'Victim alert sent', type: 'alert' },
    ],
    
    detectionTime: '1 min 48 sec',
    spreadReduction: '63%',
    victimNotificationTime: '< 5 min',
  },
  
  {
    id: 'case-003',
    fileName: 'celebrity_endorsement.mp4',
    duration: '00:28',
    uploadTime: '15 minutes ago',
    uploadSource: 'Social media platform',
    uploaderStatus: 'New account (< 7 days)',
    currentViews: 892,
    sharesPerMin: 34,
    growthVelocity: 'Medium',
    status: 'Containment Active',
    
    facialConsistency: 81,
    lipAudioSync: 76,
    identityMatch: 88,
    metadataIntegrity: 'Medium',
    overallRiskScore: 83,
    
    viralityData: [
      { time: 0, actual: 0, projected: 0 },
      { time: 2, actual: 210, projected: 230 },
      { time: 4, actual: 380, projected: 450 },
      { time: 6, actual: 520, projected: 720 },
      { time: 8, actual: 640, projected: 1050 },
      { time: 9.2, actual: 697, projected: 1240 },
      { time: 10, actual: 730, projected: 1450 },
      { time: 12, actual: 810, projected: 1920 },
      { time: 14, actual: 870, projected: 2480 },
      { time: 15, actual: 892, projected: 2850 },
    ],
    
    containmentTriggeredAt: 9.2,
    viewsBeforeContainment: 697,
    viewsAfterContainment: 892,
    projectedWithoutContainment: 2850,
    
    thumbnailGradient: 'from-purple-900 to-pink-900',
    thumbnailIcon: 'video',
    
    containmentActions: {
      amplificationReduced: '09:12',
      reshareFriction: '09:15',
      contextLabel: '09:18',
      evidenceArchived: '09:22',
    },
    
    auditTimeline: [
      { time: '00:18', event: 'Content detected', type: 'detection' },
      { time: '00:25', event: 'Risk analysis initiated', type: 'analysis' },
      { time: '09:12', event: 'High-risk threshold crossed', type: 'risk' },
      { time: '09:15', event: 'Containment activated', type: 'containment' },
      { time: '09:18', event: 'Context label applied', type: 'label' },
      { time: '09:22', event: 'Victim alert sent', type: 'alert' },
    ],
    
    detectionTime: '3 min 25 sec',
    spreadReduction: '69%',
    victimNotificationTime: '< 10 min',
  },
  
  {
    id: 'case-004',
    fileName: 'news_anchor_statement.mp4',
    duration: '00:54',
    uploadTime: '32 minutes ago',
    uploadSource: 'Messaging platform',
    uploaderStatus: 'Verified account',
    currentViews: 2156,
    sharesPerMin: 18,
    growthVelocity: 'Low',
    status: 'Low Risk',
    
    facialConsistency: 92,
    lipAudioSync: 41,
    identityMatch: 67,
    metadataIntegrity: 'High',
    overallRiskScore: 58,
    
    viralityData: [
      { time: 0, actual: 0, projected: 0 },
      { time: 5, actual: 340, projected: 340 },
      { time: 10, actual: 680, projected: 680 },
      { time: 15, actual: 1020, projected: 1020 },
      { time: 20, actual: 1360, projected: 1360 },
      { time: 25, actual: 1700, projected: 1700 },
      { time: 30, actual: 2040, projected: 2040 },
      { time: 32, actual: 2156, projected: 2156 },
    ],
    
    thumbnailGradient: 'from-gray-800 to-slate-900',
    thumbnailIcon: 'news',
    
    auditTimeline: [
      { time: '00:12', event: 'Content detected', type: 'detection' },
      { time: '00:18', event: 'Risk analysis initiated', type: 'analysis' },
      { time: '02:45', event: 'Low-risk assessment completed', type: 'analysis' },
    ],
    
    detectionTime: '2 min 45 sec',
    spreadReduction: '0%',
    victimNotificationTime: 'N/A',
  },
];

export const getContentCase = (id: string): ContentCase | undefined => {
  return demoContentCases.find(c => c.id === id);
};

export const getActiveContentCases = (): ContentCase[] => {
  return demoContentCases.filter(c => c.status !== 'Low Risk');
};

export const getHighRiskContentCases = (): ContentCase[] => {
  return demoContentCases.filter(c => c.overallRiskScore >= 80);
};
