const { sequelize, Job } = require("./models");

const seedJobs = async () => {
  try {
    await sequelize.sync({ force: true }); // Clear the database and recreate tables

    // Add initial job data
    await Job.bulkCreate([
      {
        title: "Frontend Developer",
        skills: "Frontend,CSS,JavaScript,HTML",
        companySize: "11-50",
        salary: 50000,
        location: "Delhi",
        type: "Office",
      },
      {
        title: "WordPress Developer",
        skills: "CSS,HTML,WordPress",
        companySize: "11-50",
        salary: 25000,
        location: "Bangalore",
        type: "Remote",
      },
      {
        title: "Frontend Developer",
        skills: "Frontend,CSS,JavaScript,HTML",
        companySize: "11-50",
        salary: 35000,
        location: "Mumbai",
        type: "Office",
      },
    ]);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedJobs();