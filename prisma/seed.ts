import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Create Cameras
  const cameraA = await prisma.camera.upsert({
    where: { name: 'Shop Floor A' },
    update: {},
    create: {
      id: uuidv4(),
      name: 'Shop Floor A',
      location: 'Main Retail Area',
    },
  });

  const cameraB = await prisma.camera.upsert({
    where: { name: 'Vault' },
    update: {},
    create: {
      id: uuidv4(),
      name: 'Vault',
      location: 'High Security Zone',
    },
  });

  const cameraC = await prisma.camera.upsert({
    where: { name: 'Entrance' },
    update: {},
    create: {
      id: uuidv4(),
      name: 'Entrance',
      location: 'Building Foyer',
    },
  });

  const cameraD = await prisma.camera.upsert({
    where: { name: 'Warehouse Exit' },
    update: {},
    create: {
      id: uuidv4(),
      name: 'Warehouse Exit',
      location: 'Loading Dock',
    },
  });

  // Create Incidents (covering a 24-hour span)
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
  const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
  const threeHoursAgo = new Date(now.getTime() - 3 * 60 * 60 * 1000);
  const sixHoursAgo = new Date(now.getTime() - 6 * 60 * 60 * 1000);
  const twelveHoursAgo = new Date(now.getTime() - 12 * 60 * 60 * 1000);
  const eighteenHoursAgo = new Date(now.getTime() - 18 * 60 * 60 * 1000);
  const twentyHoursAgo = new Date(now.getTime() - 20 * 60 * 60 * 1000);
  const twentyTwoHoursAgo = new Date(now.getTime() - 22 * 60 * 60 * 1000);
  const twentyThreeHoursAgo = new Date(now.getTime() - 23 * 60 * 60 * 1000);

  const incidents = [
    // Camera A incidents
    {
      cameraId: cameraA.id,
      type: 'Unauthorised Access',
      tsStart: oneHourAgo,
      tsEnd: new Date(oneHourAgo.getTime() + 5 * 60 * 1000), // 5 mins
      thumbnailUrl: '/thumbnails/unauthorised_access_1.jpg',
      resolved: false,
    },
    {
      cameraId: cameraA.id,
      type: 'Face Recognised',
      tsStart: threeHoursAgo,
      tsEnd: new Date(threeHoursAgo.getTime() + 1 * 60 * 1000), // 1 min
      thumbnailUrl: '/thumbnails/face_recognised_1.jpg',
      resolved: true,
    },
    {
      cameraId: cameraA.id,
      type: 'Suspicious Package',
      tsStart: twelveHoursAgo,
      tsEnd: new Date(twelveHoursAgo.getTime() + 10 * 60 * 1000), // 10 mins
      thumbnailUrl: '/thumbnails/suspicious_package_1.jpg',
      resolved: false,
    },
    {
      cameraId: cameraA.id,
      type: 'Unauthorised Access',
      tsStart: twentyHoursAgo,
      tsEnd: new Date(twentyHoursAgo.getTime() + 7 * 60 * 1000), // 7 mins
      thumbnailUrl: '/thumbnails/unauthorised_access_2.jpg',
      resolved: true,
    },

    // Camera B incidents
    {
      cameraId: cameraB.id,
      type: 'Gun Threat',
      tsStart: new Date(now.getTime() - 30 * 60 * 1000), // 30 mins ago
      tsEnd: new Date(now.getTime() - 28 * 60 * 1000), // 2 mins later
      thumbnailUrl: '/thumbnails/gun_threat_1.jpg',
      resolved: false,
    },
    {
      cameraId: cameraB.id,
      type: 'Unauthorised Access',
      tsStart: sixHoursAgo,
      tsEnd: new Date(sixHoursAgo.getTime() + 15 * 60 * 1000), // 15 mins
      thumbnailUrl: '/thumbnails/unauthorised_access_3.jpg',
      resolved: false,
    },
    {
      cameraId: cameraB.id,
      type: 'Face Recognised',
      tsStart: eighteenHoursAgo,
      tsEnd: new Date(eighteenHoursAgo.getTime() + 2 * 60 * 1000), // 2 mins
      thumbnailUrl: '/thumbnails/face_recognised_2.jpg',
      resolved: false,
    },

    // Camera C incidents
    {
      cameraId: cameraC.id,
      type: 'Loitering',
      tsStart: twoHoursAgo,
      tsEnd: new Date(twoHoursAgo.getTime() + 8 * 60 * 1000), // 8 mins
      thumbnailUrl: '/thumbnails/loitering_1.jpg',
      resolved: false,
    },
    {
      cameraId: cameraC.id,
      type: 'Gun Threat',
      tsStart: twentyTwoHoursAgo,
      tsEnd: new Date(twentyTwoHoursAgo.getTime() + 3 * 60 * 1000), // 3 mins
      thumbnailUrl: '/thumbnails/gun_threat_2.jpg',
      resolved: true,
    },
    {
      cameraId: cameraC.id,
      type: 'Unauthorised Access',
      tsStart: twentyThreeHoursAgo,
      tsEnd: new Date(twentyThreeHoursAgo.getTime() + 9 * 60 * 1000), // 9 mins
      thumbnailUrl: '/thumbnails/unauthorised_access_4.jpg',
      resolved: false,
    },

    // Camera D incidents (additional for variety)
    {
      cameraId: cameraD.id,
      type: 'Vehicle Detected',
      tsStart: new Date(now.getTime() - 4 * 60 * 60 * 1000), // 4 hours ago
      tsEnd: new Date(now.getTime() - 4 * 60 * 60 * 1000 + 2 * 60 * 1000),
      thumbnailUrl: '/thumbnails/vehicle_detected_1.jpg',
      resolved: false,
    },
    {
      cameraId: cameraD.id,
      type: 'Object Left Behind',
      tsStart: new Date(now.getTime() - 10 * 60 * 60 * 1000), // 10 hours ago
      tsEnd: new Date(now.getTime() - 10 * 60 * 60 * 1000 + 5 * 60 * 1000),
      thumbnailUrl: '/thumbnails/object_left_behind_1.jpg',
      resolved: true,
    },
  ];

  for (const incidentData of incidents) {
    await prisma.incident.create({ data: incidentData });
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });