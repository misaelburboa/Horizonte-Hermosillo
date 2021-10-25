const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialSchema1635190702546 {
    name = 'initialSchema1635190702546'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "event" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "date" datetime NOT NULL, "singleSeatsNumber" integer NOT NULL, "doubleSeatsNumber" integer NOT NULL, "isActive" boolean NOT NULL DEFAULT (0), "isDeleted" boolean NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "attendee" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "attendeeFullName" varchar NOT NULL, "secondAttendeeFullName" varchar, "phone1" varchar NOT NULL, "phone2" varchar, "seatNumber" varchar, "seatType" varchar NOT NULL, "temperature" integer, "arrivalTime" time, "cancellationCode" varchar NOT NULL, "isCancel" boolean NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "eventId" integer)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar, "email" varchar NOT NULL, "name" varchar NOT NULL, "phone" varchar NOT NULL, "isAdmin" boolean NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_attendee" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "attendeeFullName" varchar NOT NULL, "secondAttendeeFullName" varchar, "phone1" varchar NOT NULL, "phone2" varchar, "seatNumber" varchar, "seatType" varchar NOT NULL, "cancellationCode" varchar NOT NULL, "eventId" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_attendee"("id", "attendeeFullName", "secondAttendeeFullName", "phone1", "phone2", "seatNumber", "seatType", "cancellationCode", "eventId") SELECT "id", "attendeeFullName", "secondAttendeeFullName", "phone1", "phone2", "seatNumber", "seatType", "cancellationCode", "eventId" FROM "attendee"`);
        await queryRunner.query(`DROP TABLE "attendee"`);
        await queryRunner.query(`ALTER TABLE "temporary_attendee" RENAME TO "attendee"`);
        await queryRunner.query(`CREATE TABLE "temporary_event" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "date" datetime NOT NULL, "singleSeatsNumber" integer NOT NULL, "doubleSeatsNumber" integer NOT NULL, "isActive" boolean NOT NULL DEFAULT (0), "isDeleted" boolean NOT NULL DEFAULT (0))`);
        await queryRunner.query(`INSERT INTO "temporary_event"("id", "name", "date", "singleSeatsNumber", "doubleSeatsNumber", "isActive", "isDeleted") SELECT "id", "name", "date", "singleSeatsNumber", "doubleSeatsNumber", "isActive", "isDeleted" FROM "event"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`ALTER TABLE "temporary_event" RENAME TO "event"`);
        await queryRunner.query(`CREATE TABLE "temporary_attendee" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "attendeeFullName" varchar NOT NULL, "secondAttendeeFullName" varchar, "phone1" varchar NOT NULL, "phone2" varchar, "seatNumber" varchar, "seatType" varchar NOT NULL, "cancellationCode" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_attendee"("id", "attendeeFullName", "secondAttendeeFullName", "phone1", "phone2", "seatNumber", "seatType", "cancellationCode") SELECT "id", "attendeeFullName", "secondAttendeeFullName", "phone1", "phone2", "seatNumber", "seatType", "cancellationCode" FROM "attendee"`);
        await queryRunner.query(`DROP TABLE "attendee"`);
        await queryRunner.query(`ALTER TABLE "temporary_attendee" RENAME TO "attendee"`);
        await queryRunner.query(`CREATE TABLE "temporary_event" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "date" datetime NOT NULL, "singleSeatsNumber" integer NOT NULL, "doubleSeatsNumber" integer NOT NULL, "isActive" boolean NOT NULL DEFAULT (0), "isDeleted" boolean NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_event"("id", "name", "date", "singleSeatsNumber", "doubleSeatsNumber", "isActive", "isDeleted") SELECT "id", "name", "date", "singleSeatsNumber", "doubleSeatsNumber", "isActive", "isDeleted" FROM "event"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`ALTER TABLE "temporary_event" RENAME TO "event"`);
        await queryRunner.query(`CREATE TABLE "temporary_attendee" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "attendeeFullName" varchar NOT NULL, "secondAttendeeFullName" varchar, "phone1" varchar NOT NULL, "phone2" varchar, "seatNumber" varchar, "seatType" varchar NOT NULL, "cancellationCode" varchar NOT NULL, "temperature" integer, "arrivalTime" time, "isCancel" boolean NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "eventId" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_attendee"("id", "attendeeFullName", "secondAttendeeFullName", "phone1", "phone2", "seatNumber", "seatType", "cancellationCode") SELECT "id", "attendeeFullName", "secondAttendeeFullName", "phone1", "phone2", "seatNumber", "seatType", "cancellationCode" FROM "attendee"`);
        await queryRunner.query(`DROP TABLE "attendee"`);
        await queryRunner.query(`ALTER TABLE "temporary_attendee" RENAME TO "attendee"`);
        await queryRunner.query(`CREATE TABLE "temporary_attendee" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "attendeeFullName" varchar NOT NULL, "secondAttendeeFullName" varchar NOT NULL, "phone1" varchar NOT NULL, "phone2" varchar NOT NULL, "seatNumber" varchar NOT NULL, "seatType" varchar NOT NULL, "cancellationCode" varchar NOT NULL, "temperature" integer, "arrivalTime" time, "isCancel" boolean NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "eventId" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_attendee"("id", "attendeeFullName", "secondAttendeeFullName", "phone1", "phone2", "seatNumber", "seatType", "cancellationCode", "temperature", "arrivalTime", "isCancel", "createdAt", "eventId") SELECT "id", "attendeeFullName", "secondAttendeeFullName", "phone1", "phone2", "seatNumber", "seatType", "cancellationCode", "temperature", "arrivalTime", "isCancel", "createdAt", "eventId" FROM "attendee"`);
        await queryRunner.query(`DROP TABLE "attendee"`);
        await queryRunner.query(`ALTER TABLE "temporary_attendee" RENAME TO "attendee"`);
        await queryRunner.query(`CREATE TABLE "temporary_attendee" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "attendeeFullName" varchar NOT NULL, "secondAttendeeFullName" varchar NOT NULL, "phone1" varchar NOT NULL, "phone2" varchar NOT NULL, "seatNumber" varchar NOT NULL, "seatType" varchar NOT NULL, "cancellationCode" varchar NOT NULL, "temperature" integer, "arrivalTime" time, "isCancel" boolean NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "eventId" integer, CONSTRAINT "FK_7d85e02cada107c99eb697dd1fe" FOREIGN KEY ("eventId") REFERENCES "event" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_attendee"("id", "attendeeFullName", "secondAttendeeFullName", "phone1", "phone2", "seatNumber", "seatType", "cancellationCode", "temperature", "arrivalTime", "isCancel", "createdAt", "eventId") SELECT "id", "attendeeFullName", "secondAttendeeFullName", "phone1", "phone2", "seatNumber", "seatType", "cancellationCode", "temperature", "arrivalTime", "isCancel", "createdAt", "eventId" FROM "attendee"`);
        await queryRunner.query(`DROP TABLE "attendee"`);
        await queryRunner.query(`ALTER TABLE "temporary_attendee" RENAME TO "attendee"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "attendee" RENAME TO "temporary_attendee"`);
        await queryRunner.query(`CREATE TABLE "attendee" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "attendeeFullName" varchar NOT NULL, "secondAttendeeFullName" varchar NOT NULL, "phone1" varchar NOT NULL, "phone2" varchar NOT NULL, "seatNumber" varchar NOT NULL, "seatType" varchar NOT NULL, "cancellationCode" varchar NOT NULL, "temperature" integer, "arrivalTime" time, "isCancel" boolean NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "eventId" integer)`);
        await queryRunner.query(`INSERT INTO "attendee"("id", "attendeeFullName", "secondAttendeeFullName", "phone1", "phone2", "seatNumber", "seatType", "cancellationCode", "temperature", "arrivalTime", "isCancel", "createdAt", "eventId") SELECT "id", "attendeeFullName", "secondAttendeeFullName", "phone1", "phone2", "seatNumber", "seatType", "cancellationCode", "temperature", "arrivalTime", "isCancel", "createdAt", "eventId" FROM "temporary_attendee"`);
        await queryRunner.query(`DROP TABLE "temporary_attendee"`);
        await queryRunner.query(`ALTER TABLE "attendee" RENAME TO "temporary_attendee"`);
        await queryRunner.query(`CREATE TABLE "attendee" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "attendeeFullName" varchar NOT NULL, "secondAttendeeFullName" varchar, "phone1" varchar NOT NULL, "phone2" varchar, "seatNumber" varchar, "seatType" varchar NOT NULL, "cancellationCode" varchar NOT NULL, "temperature" integer, "arrivalTime" time, "isCancel" boolean NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "eventId" integer)`);
        await queryRunner.query(`INSERT INTO "attendee"("id", "attendeeFullName", "secondAttendeeFullName", "phone1", "phone2", "seatNumber", "seatType", "cancellationCode", "temperature", "arrivalTime", "isCancel", "createdAt", "eventId") SELECT "id", "attendeeFullName", "secondAttendeeFullName", "phone1", "phone2", "seatNumber", "seatType", "cancellationCode", "temperature", "arrivalTime", "isCancel", "createdAt", "eventId" FROM "temporary_attendee"`);
        await queryRunner.query(`DROP TABLE "temporary_attendee"`);
        await queryRunner.query(`ALTER TABLE "attendee" RENAME TO "temporary_attendee"`);
        await queryRunner.query(`CREATE TABLE "attendee" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "attendeeFullName" varchar NOT NULL, "secondAttendeeFullName" varchar, "phone1" varchar NOT NULL, "phone2" varchar, "seatNumber" varchar, "seatType" varchar NOT NULL, "cancellationCode" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "attendee"("id", "attendeeFullName", "secondAttendeeFullName", "phone1", "phone2", "seatNumber", "seatType", "cancellationCode") SELECT "id", "attendeeFullName", "secondAttendeeFullName", "phone1", "phone2", "seatNumber", "seatType", "cancellationCode" FROM "temporary_attendee"`);
        await queryRunner.query(`DROP TABLE "temporary_attendee"`);
        await queryRunner.query(`ALTER TABLE "event" RENAME TO "temporary_event"`);
        await queryRunner.query(`CREATE TABLE "event" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "date" datetime NOT NULL, "singleSeatsNumber" integer NOT NULL, "doubleSeatsNumber" integer NOT NULL, "isActive" boolean NOT NULL DEFAULT (0), "isDeleted" boolean NOT NULL DEFAULT (0))`);
        await queryRunner.query(`INSERT INTO "event"("id", "name", "date", "singleSeatsNumber", "doubleSeatsNumber", "isActive", "isDeleted") SELECT "id", "name", "date", "singleSeatsNumber", "doubleSeatsNumber", "isActive", "isDeleted" FROM "temporary_event"`);
        await queryRunner.query(`DROP TABLE "temporary_event"`);
        await queryRunner.query(`ALTER TABLE "attendee" RENAME TO "temporary_attendee"`);
        await queryRunner.query(`CREATE TABLE "attendee" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "attendeeFullName" varchar NOT NULL, "secondAttendeeFullName" varchar, "phone1" varchar NOT NULL, "phone2" varchar, "seatNumber" varchar, "seatType" varchar NOT NULL, "cancellationCode" varchar NOT NULL, "eventId" integer)`);
        await queryRunner.query(`INSERT INTO "attendee"("id", "attendeeFullName", "secondAttendeeFullName", "phone1", "phone2", "seatNumber", "seatType", "cancellationCode") SELECT "id", "attendeeFullName", "secondAttendeeFullName", "phone1", "phone2", "seatNumber", "seatType", "cancellationCode" FROM "temporary_attendee"`);
        await queryRunner.query(`DROP TABLE "temporary_attendee"`);
        await queryRunner.query(`ALTER TABLE "event" RENAME TO "temporary_event"`);
        await queryRunner.query(`CREATE TABLE "event" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "date" datetime NOT NULL, "singleSeatsNumber" integer NOT NULL, "doubleSeatsNumber" integer NOT NULL, "isActive" boolean NOT NULL DEFAULT (0), "isDeleted" boolean NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "event"("id", "name", "date", "singleSeatsNumber", "doubleSeatsNumber", "isActive", "isDeleted") SELECT "id", "name", "date", "singleSeatsNumber", "doubleSeatsNumber", "isActive", "isDeleted" FROM "temporary_event"`);
        await queryRunner.query(`DROP TABLE "temporary_event"`);
        await queryRunner.query(`ALTER TABLE "attendee" RENAME TO "temporary_attendee"`);
        await queryRunner.query(`CREATE TABLE "attendee" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "attendeeFullName" varchar NOT NULL, "secondAttendeeFullName" varchar, "phone1" varchar NOT NULL, "phone2" varchar, "seatNumber" varchar, "seatType" varchar NOT NULL, "temperature" integer, "arrivalTime" time, "cancellationCode" varchar NOT NULL, "isCancel" boolean NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "eventId" integer)`);
        await queryRunner.query(`INSERT INTO "attendee"("id", "attendeeFullName", "secondAttendeeFullName", "phone1", "phone2", "seatNumber", "seatType", "cancellationCode", "eventId") SELECT "id", "attendeeFullName", "secondAttendeeFullName", "phone1", "phone2", "seatNumber", "seatType", "cancellationCode", "eventId" FROM "temporary_attendee"`);
        await queryRunner.query(`DROP TABLE "temporary_attendee"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "attendee"`);
        await queryRunner.query(`DROP TABLE "event"`);
    }
}
/* es-lint-enable*/
