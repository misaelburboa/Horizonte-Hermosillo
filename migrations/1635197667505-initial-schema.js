// eslint-disable-next-line
const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class initialSchema1635197667505 {
  name = 'initialSchema1635197667505';

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "event" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "singleSeatsNumber" integer NOT NULL, "doubleSeatsNumber" integer NOT NULL, "isActive" boolean NOT NULL DEFAULT false, "isDeleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "attendee" ("id" SERIAL NOT NULL, "attendeeFullName" character varying NOT NULL, "secondAttendeeFullName" character varying, "phone1" character varying NOT NULL, "phone2" character varying, "seatNumber" character varying, "seatType" character varying NOT NULL, "temperature" integer, "arrivalTime" TIME, "cancellationCode" character varying NOT NULL, "isCancel" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "eventId" integer, CONSTRAINT "PK_070338c19378315cb793abac656" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying, "email" character varying NOT NULL, "name" character varying NOT NULL, "phone" character varying NOT NULL, "isAdmin" boolean NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "attendee" DROP COLUMN "temperature"`);
    await queryRunner.query(`ALTER TABLE "attendee" DROP COLUMN "arrivalTime"`);
    await queryRunner.query(`ALTER TABLE "attendee" DROP COLUMN "isCancel"`);
    await queryRunner.query(`ALTER TABLE "attendee" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "attendee" DROP COLUMN "eventId"`);
    await queryRunner.query(
      `ALTER TABLE "event" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "event" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "attendee" ADD "temperature" integer`);
    await queryRunner.query(`ALTER TABLE "attendee" ADD "arrivalTime" TIME`);
    await queryRunner.query(
      `ALTER TABLE "attendee" ADD "isCancel" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendee" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "attendee" ADD "eventId" integer`);
    await queryRunner.query(
      `ALTER TABLE "attendee" ALTER COLUMN "secondAttendeeFullName" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendee" ALTER COLUMN "phone2" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendee" ALTER COLUMN "seatNumber" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendee" ADD CONSTRAINT "FK_7d85e02cada107c99eb697dd1fe" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "attendee" DROP CONSTRAINT "FK_7d85e02cada107c99eb697dd1fe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendee" ALTER COLUMN "seatNumber" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendee" ALTER COLUMN "phone2" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendee" ALTER COLUMN "secondAttendeeFullName" DROP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "attendee" DROP COLUMN "eventId"`);
    await queryRunner.query(`ALTER TABLE "attendee" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "attendee" DROP COLUMN "isCancel"`);
    await queryRunner.query(`ALTER TABLE "attendee" DROP COLUMN "arrivalTime"`);
    await queryRunner.query(`ALTER TABLE "attendee" DROP COLUMN "temperature"`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "attendee" ADD "eventId" integer`);
    await queryRunner.query(
      `ALTER TABLE "event" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "event" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendee" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendee" ADD "isCancel" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(`ALTER TABLE "attendee" ADD "arrivalTime" TIME`);
    await queryRunner.query(`ALTER TABLE "attendee" ADD "temperature" integer`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "attendee"`);
    await queryRunner.query(`DROP TABLE "event"`);
  }
};
