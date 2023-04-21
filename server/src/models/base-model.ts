import { Model, ModelOptions, QueryContext } from "objection";

class BaseModel extends Model {
  id!: number;

}

export { BaseModel };
