import { Router } from "express";
import { SchedulesController } from "../controllers/schedules.controller";
import { AuthMiddleware } from "../middlewares/auth";

class SchedulesRoutes {
  private router: Router;
  private schedulesController: SchedulesController;
  private authMiddleware: AuthMiddleware;
  constructor() {
    this.router = Router();
    this.schedulesController = new SchedulesController();
    this.authMiddleware = new AuthMiddleware();
  }
  getRoutes(): Router {
    this.router.post(
      "/",
      this.authMiddleware.auth.bind(this.authMiddleware),
      this.schedulesController.store.bind(this.schedulesController)
    );

    this.router.get(
      "/",
      this.authMiddleware.auth.bind(this.authMiddleware),
      this.schedulesController.index.bind(this.schedulesController)
    );

    this.router.get(
      "/getall",
      this.authMiddleware.auth.bind(this.authMiddleware),
      this.schedulesController.indexes.bind(this.schedulesController)
    );

    this.router.delete(
      "/deleteoldschedules",
      this.authMiddleware.auth.bind(this.authMiddleware),
      this.schedulesController.deleteOldSchedules.bind(this.schedulesController)
    );

    this.router.patch(
      "/:id",
      this.authMiddleware.auth.bind(this.authMiddleware),
      this.schedulesController.update.bind(this.schedulesController)
    );

    this.router.delete(
      "/:id",
      this.authMiddleware.auth.bind(this.authMiddleware),
      this.schedulesController.delete.bind(this.schedulesController)
    );
    return this.router;
  }
}
export { SchedulesRoutes };
