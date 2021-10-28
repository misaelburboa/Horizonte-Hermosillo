const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class attendeesEntityUpdated1635434420388 {
    name = 'attendeesEntityUpdated1635434420388'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "attendee" DROP CONSTRAINT "FK_7d85e02cada107c99eb697dd1fe"`);
        await queryRunner.query(`ALTER TABLE "attendee" DROP COLUMN "temperature"`);
        await queryRunner.query(`ALTER TABLE "attendee" DROP COLUMN "arrivalTime"`);
        await queryRunner.query(`ALTER TABLE "attendee" DROP COLUMN "isCancel"`);
        await queryRunner.query(`ALTER TABLE "attendee" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "attendee" DROP COLUMN "eventId"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "event" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "attendee" ADD "temperature" integer`);
        await queryRunner.query(`ALTER TABLE "attendee" ADD "arrivalTime" TIME`);
        await queryRunner.query(`ALTER TABLE "attendee" ADD "isCancel" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "attendee" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "attendee" ADD "eventId" integer`);
        await queryRunner.query(`ALTER TABLE "attendee" ALTER COLUMN "secondAttendeeFullName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendee" ALTER COLUMN "phone2" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendee" ALTER COLUMN "seatNumber" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendee" ALTER COLUMN "secondAttendeeFullName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendee" ALTER COLUMN "phone2" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendee" ALTER COLUMN "seatNumber" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendee" ALTER COLUMN "secondAttendeeFullName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendee" ALTER COLUMN "phone2" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendee" ALTER COLUMN "seatNumber" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendee" ALTER COLUMN "secondAttendeeFullName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendee" ALTER COLUMN "phone2" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendee" ALTER COLUMN "seatNumber" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendee" ADD CONSTRAINT "FK_7d85e02cada107c99eb697dd1fe" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "attendee" DROP CONSTRAINT "FK_7d85e02cada107c99eb697dd1fe"`);
        await queryRunner.query(`ALTER TABLE "attendee" ALTER COLUMN "seatNumber" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendee" ALTER COLUMN "phone2" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendee" ALTER COLUMN "secondAttendeeFullName" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendee" ALTER COLUMN "seatNumber" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendee" ALTER COLUMN "phone2" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendee" ALTER COLUMN "secondAttendeeFullName" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendee" ALTER COLUMN "seatNumber" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendee" ALTER COLUMN "phone2" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendee" ALTER COLUMN "secondAttendeeFullName" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendee" ALTER COLUMN "seatNumber" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendee" ALTER COLUMN "phone2" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendee" ALTER COLUMN "secondAttendeeFullName" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendee" DROP COLUMN "eventId"`);
        await queryRunner.query(`ALTER TABLE "attendee" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "attendee" DROP COLUMN "isCancel"`);
        await queryRunner.query(`ALTER TABLE "attendee" DROP COLUMN "arrivalTime"`);
        await queryRunner.query(`ALTER TABLE "attendee" DROP COLUMN "temperature"`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "attendee" ADD "eventId" integer`);
        await queryRunner.query(`ALTER TABLE "event" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "event" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "attendee" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "attendee" ADD "isCancel" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "attendee" ADD "arrivalTime" TIME`);
        await queryRunner.query(`ALTER TABLE "attendee" ADD "temperature" integer`);
        await queryRunner.query(`ALTER TABLE "attendee" ADD CONSTRAINT "FK_7d85e02cada107c99eb697dd1fe" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
