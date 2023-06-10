import { Model} from "objection";

class BaseModel extends Model {
  id!: number;

}

export { BaseModel };
