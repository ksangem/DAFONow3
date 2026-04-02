export const patients = [
  { id: 'P-1001', name: 'Emma Thompson', dob: '2019-03-15', age: 7, physician: 'Dr. Sarah Chen', facility: 'Children\'s Hospital Boston', phone: '(617) 555-0142', orders: 3, lastOrder: '2026-03-15' },
  { id: 'P-1002', name: 'Liam Rodriguez', dob: '2020-07-22', age: 5, physician: 'Dr. James Wilson', facility: 'Seattle Children\'s', phone: '(206) 555-0198', orders: 2, lastOrder: '2026-03-10' },
  { id: 'P-1003', name: 'Olivia Park', dob: '2018-11-08', age: 7, physician: 'Dr. Amy Patel', facility: 'CHOP Philadelphia', phone: '(215) 555-0167', orders: 4, lastOrder: '2026-02-28' },
  { id: 'P-1004', name: 'Noah Williams', dob: '2021-01-30', age: 5, physician: 'Dr. Michael Torres', facility: 'Texas Children\'s', phone: '(713) 555-0134', orders: 1, lastOrder: '2026-03-20' },
  { id: 'P-1005', name: 'Sophia Chen', dob: '2017-06-12', age: 8, physician: 'Dr. Sarah Chen', facility: 'Children\'s Hospital Boston', phone: '(617) 555-0189', orders: 5, lastOrder: '2026-03-22' },
  { id: 'P-1006', name: 'Aiden Martinez', dob: '2019-09-05', age: 6, physician: 'Dr. Lisa Park', facility: 'Lurie Children\'s Chicago', phone: '(312) 555-0156', orders: 2, lastOrder: '2026-03-18' },
  { id: 'P-1007', name: 'Isabella Johnson', dob: '2020-04-18', age: 5, physician: 'Dr. James Wilson', facility: 'Seattle Children\'s', phone: '(206) 555-0171', orders: 1, lastOrder: '2026-03-25' },
  { id: 'P-1008', name: 'Mason Lee', dob: '2018-12-01', age: 7, physician: 'Dr. Amy Patel', facility: 'CHOP Philadelphia', phone: '(215) 555-0143', orders: 3, lastOrder: '2026-03-12' },
];

export const orders = [
  { id: 'ORD-2401', jobNumber: 'J-88901', patientId: 'P-1001', patientName: 'Emma Thompson', product: 'DAFO 3.5', status: 'Manufacturing', physician: 'Dr. Sarah Chen', facility: 'Children\'s Hospital Boston', orderDate: '2026-03-15', estimatedDelivery: '2026-04-05', side: 'Bilateral', size: '4C', color: 'Cotton Candy Pink', notes: 'Rush order per physician request' },
  { id: 'ORD-2402', jobNumber: 'J-88902', patientId: 'P-1002', patientName: 'Liam Rodriguez', product: 'DAFO 4', status: 'Shipped', physician: 'Dr. James Wilson', facility: 'Seattle Children\'s', orderDate: '2026-03-10', estimatedDelivery: '2026-03-30', trackingNumber: '1Z999AA10123456784', side: 'Left', size: '3B', color: 'Ocean Blue' },
  { id: 'ORD-2403', jobNumber: 'J-88903', patientId: 'P-1003', patientName: 'Olivia Park', product: 'DAFO FlexiSport', status: 'Delivered', physician: 'Dr. Amy Patel', facility: 'CHOP Philadelphia', orderDate: '2026-02-28', estimatedDelivery: '2026-03-20', deliveredDate: '2026-03-18', side: 'Bilateral', size: '5D', color: 'Starry Night' },
  { id: 'ORD-2404', jobNumber: 'J-88904', patientId: 'P-1004', patientName: 'Noah Williams', product: 'DAFO 3.5', status: 'Submitted', physician: 'Dr. Michael Torres', facility: 'Texas Children\'s', orderDate: '2026-03-20', estimatedDelivery: '2026-04-10', side: 'Right', size: '2A', color: 'Dinosaur Green' },
  { id: 'ORD-2405', jobNumber: 'J-88905', patientId: 'P-1005', patientName: 'Sophia Chen', product: 'DAFO Tami2', status: 'In Review', physician: 'Dr. Sarah Chen', facility: 'Children\'s Hospital Boston', orderDate: '2026-03-22', estimatedDelivery: '2026-04-12', side: 'Bilateral', size: '6E', color: 'Butterfly Purple' },
  { id: 'ORD-2406', jobNumber: 'J-88906', patientId: 'P-1006', patientName: 'Aiden Martinez', product: 'DAFO 4', status: 'Manufacturing', physician: 'Dr. Lisa Park', facility: 'Lurie Children\'s Chicago', orderDate: '2026-03-18', estimatedDelivery: '2026-04-08', side: 'Left', size: '3C', color: 'Race Car Red' },
  { id: 'ORD-2407', jobNumber: 'J-88907', patientId: 'P-1007', patientName: 'Isabella Johnson', product: 'DAFO 3.5', status: 'Submitted', physician: 'Dr. James Wilson', facility: 'Seattle Children\'s', orderDate: '2026-03-25', estimatedDelivery: '2026-04-15', side: 'Bilateral', size: '2B', color: 'Unicorn Rainbow' },
  { id: 'ORD-2408', jobNumber: 'J-88908', patientId: 'P-1008', patientName: 'Mason Lee', product: 'DAFO FlexiSport', status: 'Delivered', physician: 'Dr. Amy Patel', facility: 'CHOP Philadelphia', orderDate: '2026-03-01', estimatedDelivery: '2026-03-22', deliveredDate: '2026-03-21', side: 'Right', size: '4D', color: 'Galaxy Silver' },
];

export const drafts = [
  { id: 'DRF-301', patientId: 'P-1005', patientName: 'Sophia Chen', product: 'DAFO Tami2', currentStep: 3, totalSteps: 5, lastModified: '2026-03-28', side: 'Bilateral', size: '6E' },
  { id: 'DRF-302', patientId: 'P-1006', patientName: 'Aiden Martinez', product: 'DAFO 3.5', currentStep: 4, totalSteps: 5, lastModified: '2026-03-27', side: 'Left', size: '3C' },
  { id: 'DRF-303', patientId: 'P-1002', patientName: 'Liam Rodriguez', product: 'DAFO 4', currentStep: 3, totalSteps: 5, lastModified: '2026-03-26', side: 'Right', size: '3B' },
];

export const products = [
  { id: 'PROD-01', name: 'DAFO 3.5', category: 'Solid Ankle', description: 'Posterior leaf spring AFO for flexible foot and ankle control', sizes: ['1A', '2A', '2B', '3B', '3C', '4C', '4D', '5D', '5E', '6E'] },
  { id: 'PROD-02', name: 'DAFO 4', category: 'Hinged', description: 'Hinged AFO allowing controlled dorsiflexion', sizes: ['2A', '2B', '3B', '3C', '4C', '4D', '5D', '5E', '6E'] },
  { id: 'PROD-03', name: 'DAFO FlexiSport', category: 'Dynamic', description: 'Flexible sport AFO for active children', sizes: ['3B', '3C', '4C', '4D', '5D', '5E', '6E'] },
  { id: 'PROD-04', name: 'DAFO Tami2', category: 'Floor Reaction', description: 'Floor reaction AFO for knee extension assistance', sizes: ['3C', '4C', '4D', '5D', '5E', '6E'] },
  { id: 'PROD-05', name: 'DAFO JumpStart', category: 'Supramalleolar', description: 'SMO for mild foot and ankle instability', sizes: ['1A', '2A', '2B', '3B', '3C', '4C'] },
];

export const trackingSteps = [
  { key: 'submitted', label: 'Submitted', description: 'Order received and confirmed' },
  { key: 'review', label: 'In Review', description: 'Clinical team reviewing specifications' },
  { key: 'manufacturing', label: 'Manufacturing', description: 'Device being fabricated' },
  { key: 'shipped', label: 'Shipped', description: 'Package in transit' },
  { key: 'delivered', label: 'Delivered', description: 'Delivered to facility' },
];

export const notifications = [
  { id: 1, type: 'order', message: 'ORD-2402 has shipped', time: '2 hours ago', read: false },
  { id: 2, type: 'order', message: 'ORD-2401 moved to Manufacturing', time: '5 hours ago', read: false },
  { id: 3, type: 'draft', message: 'Draft DRF-301 auto-saved', time: '1 day ago', read: true },
  { id: 4, type: 'delivery', message: 'ORD-2403 delivered to CHOP', time: '2 days ago', read: true },
  { id: 5, type: 'order', message: 'ORD-2405 is now In Review', time: '3 days ago', read: true },
];

export const colorOptions = [
  'Cotton Candy Pink', 'Ocean Blue', 'Starry Night', 'Dinosaur Green',
  'Butterfly Purple', 'Race Car Red', 'Unicorn Rainbow', 'Galaxy Silver',
  'Sunshine Yellow', 'Camo Green', 'Princess Sparkle', 'Robot Gray'
];

export const getStatusClass = (status) => {
  const map = {
    'Submitted': 'status-submitted',
    'In Review': 'status-review',
    'Manufacturing': 'status-manufacturing',
    'Shipped': 'status-shipped',
    'Delivered': 'status-delivered',
  };
  return map[status] || 'status-submitted';
};

export const getStatusStep = (status) => {
  const map = {
    'Submitted': 0,
    'In Review': 1,
    'Manufacturing': 2,
    'Shipped': 3,
    'Delivered': 4,
  };
  return map[status] ?? 0;
};
