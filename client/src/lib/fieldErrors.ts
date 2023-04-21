import { InputError } from "../services/http"

export function fieldErrors(error: unknown, fieldName: string) {
  if (!(error instanceof InputError)) {
    return
  }
  
  console.log(error.fieldErrors);
  return error.fieldErrors[fieldName]
}

