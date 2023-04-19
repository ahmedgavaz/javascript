import { RequestHandler, Request, Response} from "express";
import { ZodError } from "zod";
import { BadRequestError, NotEnoughParametersError, NotFoundError, NotFoundMovieError} from "../errors";


export function requestHandler<T>(
  handler: (req: Request,res: Response) => Promise<T>
): RequestHandler {
  return async (req, res) => {
    try {
      const result = await handler(req,res);
      res.send(result);
    } catch (error) {
      if (error instanceof BadRequestError) {
        res.status(400).send({ message: error.message });
        return;
      }

      if (error instanceof NotFoundError) {
        res.status(404).send({ message: error.message });
        return;
      }

      if (error instanceof NotFoundMovieError) {
        res.status(404).send({ message: error.message });
        return;
      }

      if (error instanceof NotEnoughParametersError) {
        res.status(400).send({ message: error.message });
        return;
      }
      
      if (error instanceof ZodError) {
        res.status(400).send(error.flatten());
        return;
      }
      res.status(500).send({ message: (error as Error).message });
    }
  };
}

