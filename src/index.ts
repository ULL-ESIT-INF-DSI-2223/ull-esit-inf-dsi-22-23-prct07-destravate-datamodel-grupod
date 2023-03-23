import { Ruta } from "./datatypes/rutas";
import { Reto } from "./datatypes/retos";
import { RutaCollection } from "./collections/rutas_collection";
import { RetoCollection } from "./collections/retos_collection";
import { JsonRutas } from "./jsonadapters/jsonrutas";
import { JsonRetos } from "./jsonadapters/jsonretos";
import { Admin } from "./app/Admin";
import { Gestor } from "./app/Gestor";

// const rutas = new JsonRutas();

// rutas.addElement(
//   new Ruta(
//     "Ruta1",
//     [0, 0],
//     [1, 1],
//     1,
//     12,
//     [123],
//     "bicicleta",
//     [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
//   )
// );

// rutas.addElement(
//   new Ruta(
//     "Ruta2",
//     [0, 0],
//     [1, 1],
//     1,
//     12,
//     [123],
//     "bicicleta",
//     [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
//   )
// );
// rutas.addElement(
//   new Ruta(
//     "Ruta3",
//     [0, 0],
//     [1, 1],
//     1,
//     12,
//     [123],
//     "bicicleta",
//     [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
//   )
// );
// rutas.addElement(
//   new Ruta(
//     "Ruta4",
//     [0, 0],
//     [1, 1],
//     1,
//     12,
//     [123],
//     "bicicleta",
//     [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
//   )
// );
// rutas.addElement(
//   new Ruta(
//     "Ruta5",
//     [0, 0],
//     [1, 1],
//     1,
//     12,
//     [123],
//     "bicicleta",
//     [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
//   )
// );
// rutas.addElement(
//   new Ruta(
//     "Ruta6",
//     [0, 0],
//     [1, 1],
//     1,
//     12,
//     [123],
//     "bicicleta",
//     [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
//   )
// );
// rutas.addElement(
//   new Ruta(
//     "Ruta7",
//     [0, 0],
//     [1, 1],
//     1,
//     12,
//     [123],
//     "bicicleta",
//     [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
//   )
// );
// rutas.addElement(
//   new Ruta(
//     "Ruta8",
//     [0, 0],
//     [1, 1],
//     1,
//     12,
//     [123],
//     "bicicleta",
//     [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
//   )
// );
// rutas.addElement(
//   new Ruta(
//     "Ruta9",
//     [0, 0],
//     [1, 1],
//     1,
//     12,
//     [123],
//     "bicicleta",
//     [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
//   )
// );
// rutas.addElement(
//   new Ruta(
//     "Ruta10",
//     [0, 0],
//     [1, 1],
//     1,
//     12,
//     [123],
//     "bicicleta",
//     [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
//   )
// );

const gestor = new Gestor();

gestor.start();
