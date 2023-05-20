import { get } from "../services/dataService"
const Cars = () => {
  //get all cars
  get('/')
  return (
    <div>Cars</div>
  )
}

export default Cars