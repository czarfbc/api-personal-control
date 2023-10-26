import { endOfDay, startOfDay } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { prisma } from "../database/prisma";
import { ICreate } from "../interfaces/schedules.interface";

class SchedulesRepository {
  async create({ name, phone, date, user_id, description }: ICreate) {
    const timeZone = "America/Sao_Paulo";
    const dateInGmtMinus3 = utcToZonedTime(date, timeZone);

    const result = await prisma.schedule.create({
      data: {
        name,
        phone,
        date: dateInGmtMinus3,
        user_id,
        description,
      },
    });
    return result;
  }

  async findAll(user_id: string) {
    const result = await prisma.schedule.findMany({
      where: {
        user_id,
      },
      orderBy: {
        date: "asc",
      },
    });
    return result;
  }

  async deleteOldSchedules(user_id: string) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 91);

    const result = await this.findAll(user_id);
    const filteredData = result.filter(
      (item) => new Date(item.date) < currentDate
    );

    for (const item of filteredData) {
      await prisma.schedule.delete({
        where: { id: item.id },
      });
    }

    return filteredData;
  }

  async findIfVerificationIsAvailable(date: Date, user_id: string) {
    const result = await prisma.schedule.findFirst({
      where: {
        date,
        user_id,
      },
    });
    return result;
  }

  async findById(id: string) {
    const result = await prisma.schedule.findUnique({
      where: { id },
    });
    return result;
  }

  async findEverythingOfTheDay(date: Date, user_id: string) {
    const result = await prisma.schedule.findMany({
      where: {
        date: {
          gte: startOfDay(date),
          lt: endOfDay(date),
        },
        user_id,
      },
      orderBy: {
        date: "asc",
      },
    });
    return result;
  }

  async update(id: string, date: Date, phone: string, description: string) {
    const result = await prisma.schedule.update({
      where: {
        id,
      },
      data: {
        date,
        phone,
        description,
      },
    });
    return result;
  }

  async delete(id: string) {
    const result = await prisma.schedule.delete({
      where: { id },
    });
    return result;
  }
}
export { SchedulesRepository };
