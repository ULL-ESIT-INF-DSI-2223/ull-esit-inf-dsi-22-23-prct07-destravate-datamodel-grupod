[![Node.js CI](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct07-destravate-datamodel-grupod/actions/workflows/node.js.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct07-destravate-datamodel-grupod/actions/workflows/node.js.yml)
[![Tests](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct07-destravate-datamodel-grupod/actions/workflows/test.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct07-destravate-datamodel-grupod/actions/workflows/test.yml)

# Práctica 7 - DeStravaTe

## Enunciado

En esta práctica, tendremos que desarrollar un sistema de datos basado en una aplicación deportiva. Usaremos los módulos Inquirer.js para la interacción con el usuario y LowDB para la persistencia de datos. Se seguirá la metodología de desarrollo dirigido por pruebas (TDD), incluyendo los tests pertinentes con Mocha y Chai. Por otra parte, se usará la herramienta de integración continua Node.js CI, así como Coveralls para el análisis de cobertura de los tests y SonarCloud para el análisis estático del código.

## Descripción de requisitos del sistema

### Interfaz Datatype

Antes de implementar las clases definidas por los requisitos del sistema, definiremos la interfaz `Datatype`, la cual será implementada por todas las clases que sean instancias de datos.

```typescript
export interface Datatype {
  id: number;
  nombre: string;
}
```

Estos atributos serán comunes a todas las clases que implementen la interfaz `Datatype`, y serán usados para identificar a cada objeto de datos.

### Rutas

En primer lugar, se deberá implementar la clase Ruta, que contendrá la información de una ruta. Esta clase tendrá los siguientes atributos:

- ID de ruta
- Nombre de ruta
- Geolocalización de inicio
- Geolocalización de fin
- Distancia
- Desnivel medio
- Usuarios que han realizado la ruta
- Tipo de actividad (correr o bicileta)
- Calificación de la ruta

```typescript
export class Ruta implements Datatype {
  private static rutacount = 0;
  public id: number;
  public static ids_rutas: number[] = [];
  private calificacion_media: number;

  constructor(
    public nombre: string,
    private cordenadas_incio: Coordenadas,
    private cordenadas_fin: Coordenadas,
    private distancia: number,
    private desnivel: number,
    private usuarios_ya_realizados: number[],
    private tipo_ruta: Actividad,
    private calificacion: number[]
  ) {
    this.id = Ruta.rutacount++;
    this.cordenadas_incio = cordenadas_incio;
    this.cordenadas_fin = cordenadas_fin;
    this.distancia = distancia;
    this.desnivel = desnivel;
    this.usuarios_ya_realizados = usuarios_ya_realizados;
    this.tipo_ruta = tipo_ruta;
    this.calificacion = calificacion;
    this.calificacion_media =
      this.calificacion.reduce((a, b) => a + b, 0) / this.calificacion.length;
  }
}
```

Para esta clase y las demás que implementen un identificador, se ha definido un atributo estático que servirá para contar el número de instancias de cada clase. De esta forma, se podrá asignar un identificador único a cada objeto de datos.

### Usuarios

En segundo lugar, se deberá implementar la clase Usuario. Esta clase tendrá los siguientes atributos:

- ID de usuario
- Nombre de usuario
- Actividades que realiza (correr o bicicleta)
- Amigos
- Estadísticas de entrenamiento
- Rutas favoritas
- Retos activos
- Rutas que ha realizado

```typescript
export class Usuario implements Datatype {
  private static usercount = 0;
  public id: number;

  constructor(
    public nombre: string,
    private actividad: Actividad,
    private amigos: number[],
    private stats: Stats,
    private rutas_favoritas: number[],
    private retos_activos: number[],
    private historico_rutas: { fecha: Date; rutaid: number }[]
  ) {
    this.id = Usuario.usercount++;
  }
}
```

### Grupos

Luego, se deberá implementar la clase Grupo. Esta clase tendrá los siguientes atributos:

- ID de grupo
- Nombre de grupo
- Usuarios que pertenecen al grupo
- Estadísticas de entrenamiento del grupo
- Clasificación de los usuarios
- Rutas favoritas del grupo
- Rutas realizadas por el grupo

```typescript
export class Grupo implements Datatype {
  private static groupcount = 0;
  public id: number;

  constructor(
    public nombre: string,
    private miembros: number[],
    private group_stats: Stats,
    private clasificacion: number[],
    private rutas_favoritas: number[],
    private historico_rutas: { fecha: Date; rutaid: number }[],
    private owner: number
  ) {
    this.id = Grupo.groupcount++;
  }
}
```

### Retos

Por último, se deberá implementar la clase Reto. Esta clase tendrá los siguientes atributos:

- ID de reto
- Nombre de reto
- Rutas que componen el reto
- Tipo de reto (correr o bicicleta)
- Km totales
- Usuarios que están participando en el reto

```typescript
export class Reto implements Datatype {
  private static retoCount = 0;
  public id: number;
  public static ids_retos: number[] = [];

  constructor(
    public nombre: string,
    private rutas: number[],
    private tipo_reto: Actividad,
    private km_totales: number,
    private usuarios_realizando_reto: number[]
  ) {
    this.id = Reto.retoCount++;
  }
}
```

## Colección de datos

Definiremos para cada tipo de dato una clase que contendrá una colección de objetos de ese tipo. Estas clases se encargarán de gestionar la información de los objetos de datos, y de proporcionar métodos para añadir, borrar y modificar los datos. Para ello, crearemos una clase abstracta generica que contendrá los métodos comunes a todas las colecciones de datos.

```typescript
export abstract class BaseCollection<T extends Usuario | Grupo | Reto | Ruta> {
  protected collection: Map<number, T>;
  constructor() {
    this.collection = new Map<number, T>();
  }
}
```

Hemos elegido el tipo `Map` para almacenar los datos, ya que nos permite acceder a los datos de forma eficiente mediante su identificador.

```typescript
addElement(element: T): number {
    this.collection.set(element.id, element);
    return element.id;
  }
  removeElement(id: number): void {
    this.collection.delete(id);
  }
  updateElement(element: T): void {
    this.collection.set(element.id, element);
  }
```

Con los métodos anteriores, podemos añadir, borrar y modificar elementos de la colección. Hay que tener en cuenta que estos datos se almacenan en memoria, por lo que si se cierra la aplicación, se perderán los datos.

### Colección de usuarios

```typescript
export class UsuarioCollection extends BaseCollection<Usuario> {
  constructor() {
    super();
  }
}
```

### Colección de grupos

```typescript
export class GrupoCollection extends BaseCollection<Grupo> {
  constructor() {
    super();
  }
}
```

### Colección de retos

```typescript
export class RetoCollection extends BaseCollection<Reto> {
  constructor() {
    super();
  }
}
```

### Colección de rutas

```typescript
export class RutaCollection extends BaseCollection<Ruta> {
  constructor() {
    super();
  }
}
```

## Adaptadores JSON

Para poder almacenar los datos de forma persistente, se deberá implementar un adaptador que permita guardar y cargar los datos en formato JSON. Siguiendo el patrón de diseño [Adapter](https://en.wikipedia.org/wiki/Adapter_pattern), crearemos una clase por cada tipo de dato que sea hija de la clase colección correspondiente. Estas clases redefinen los métodos de la clase padre para que se adapten a la forma en la que se almacenan los datos en formato JSON.

### Adaptador de usuarios

```typescript
export class JsonUsuarios extends UsuarioCollection {
  private db: lowdb.LowdbSync<schemaType>;
  constructor() {
    super();
    this.db = lowdb(new FileSync("./data/usuarios.json"));
    this.db.defaults({ usuarios: [] }).write();
    if (this.db.has("usuarios").value()) {
      const usuarios = this.db.get("usuarios").value();
      usuarios.forEach((item) => {
        const usuario = new Usuario(
          item.nombre,
          item.actividad,
          item.amigos,
          item.stats,
          item.rutas_favoritas,
          item.retos_activos,
          item.historico_rutas
        );
        super.addElement(usuario);
      });
    } else {
      this.db.set("usuarios", []).write();
    }
  }
```

### Adaptador de grupos

```typescript
export class JsonGrupos extends GrupoCollection {
  private db: lowdb.LowdbSync<schemaType>;
  constructor() {
    super();
    this.db = lowdb(new FileSync("./data/grupos.json"));
    this.db.defaults({ grupos: [] }).write();
    if (this.db.has("grupos").value()) {
      const grupos = this.db.get("grupos").value();
      grupos.forEach((item) => {
        const grupo = new Grupo(
          item.nombre,
          item.miembros,
          item.group_stats,
          item.clasificacion,
          item.rutas_favoritas,
          item.historico_rutas,
          item.owner
        );
        super.addElement(grupo);
      });
    } else {
      this.db.set("grupos", []).write();
    }
  }
}
```

### Adaptador de retos

```typescript
export class JsonRetos extends RetoCollection {
  private db: lowdb.LowdbSync<schemaType>;
  constructor() {
    super();
    this.db = lowdb(new FileSync("./data/retos.json"));
    this.db.defaults({ retos: [] }).write();
    if (this.db.has("retos").value()) {
      const retos = this.db.get("retos").value();
      retos.forEach((item) => {
        const reto = new Reto(
          item.nombre,
          item.ruta,
          item.tipo_reto,
          item.km_totales,
          item.usuarios_realizando_reto
        );
        super.addElement(reto);
      });
    } else {
      this.db.set("retos", []).write();
    }
  }
}
```

### Adaptador de rutas

```typescript
export class JsonRutas extends RutaCollection {
  private db: lowdb.LowdbSync<schemaType>;
  constructor() {
    super();
    this.db = lowdb(new FileSync("./data/rutas.json"));
    this.db.defaults({ rutas: [] }).write();
    if (this.db.has("rutas").value()) {
      const rutas = this.db.get("rutas").value();
      rutas.forEach((item) => {
        const ruta = new Ruta(
          item.nombre,
          item.coordenadas_inicio,
          item.coordenadas_fin,
          item.longitud,
          item.desnivel,
          item.usuarios_ya_realizados,
          item.tipo_ruta,
          item.calificacion
        );
        super.addElement(ruta);
      });
    } else {
      this.db.set("rutas", []).write();
    }
  }
}
```

### Métodos comunes de los adaptadores

Tomemos como ejemplo el adaptador de usuarios. Los métodos comunes de los adaptadores son los siguientes:

```typescript
  addElement(element: Usuario): number {
    const usuario = super.addElement(element);
    this.storeUsuario();
    return usuario;
  }
  removeElement(id: number): void {
    super.removeElement(id);
    this.storeUsuario();
  }
  storeUsuario(): void {
    this.db.set("usuarios", [...this.collection.values()]).write();
  }
  updateElement(element: Usuario): void {
    super.updateElement(element);
    this.storeUsuario();
  }
```

Estos métodos se encargan de llamar a los métodos de la clase padre para realizar la operación correspondiente, y después llamar al método `storeUsuario` para guardar los datos en el fichero JSON.

## Funcionamiento

La aplicación deberá permitir añadir, borrar y modificar rutas, usuarios, grupos y retos. Además, se deberá poder visualizar cada uno de los datos de la siguiente forma:

1. Rutas:
   - Alfabéticamente por nombre de la ruta, ascendente y descendente.
   - Cantidad de usuarios que realizan las rutas, ascendente y descendente.
   - Por longitud de la ruta, ascendente y descendente.
   - Por la calificación media de la ruta, ascendente y descendente.
   - Ordenar por actividad: correr o ciclismo.
2. Usuarios:
   - Alfabéticamente por nombre del usuario, ascendente y descendente.
   - Por cantidad de KM realizados (ascendente y descendentemente) en función de la semana actual, mes o año.
3. Grupos:
   - Alfabéticamente por nombre de la grupo, ascendente y descendente.
   - Por cantidad de KM realizados conjuntamente (ascendente y descendentemente) en función de la semana actual, mes o año.
   - Por la cantidad de miembros que lo componen, ascendente y descendente.
4. Retos:
   - Alfabéticamente por nombre del reto, ascendente y descendente.
   - Por cantidad de KM que se deben realizar, ascendente y descendente.
   - Por la cantidad de usuarios que lo están realizando, ascendente y descendente.

### Añadir datos

```typescript
crearUsuario() {
console.clear();
inquirer
.prompt([
{
type: "input",
name: "nombre",
message: "Introduce el nombre del usuario",
},
{
type: "list",
name: "actividad",
message: "Introduce la actividad que mas practica el usuario",
choices: ["correr", "bicicleta"],
},
])
.then((answers) => {
if (answers.nombre == "") {
console.log("Error al crear el usuario, nombre vacio");
this.crearUsuario();
} else {
const user = this.usuarios.findElement(answers.nombre);
if (user != undefined) {
console.log("El usuario ya existe");
this.crearUsuario();
} else {
this.usuarios.addElement(
new Usuario(
answers.nombre,
answers.actividad,
[],
new Stats(),
[],
[],
[]
)
);
this.mainMenu();
}
}
});
```

```typescript
  }
  crearGrupo() {
    console.clear();
    inquirer
      .prompt([
        {
          type: "input",
          name: "nombre",
          message: "Introduce el nombre del grupo",
        },
        {
          type: "input",
          name: "miembros",
          message: "Introduce los miembros del grupo separados por comas",
        },
      ])
      .then((answers) => {
        if (answers.nombre == "") {
          console.log("Error al crear el grupo, nombre vacio");
          this.crearGrupo();
        } else {
          const grupo = this.grupos.findElement(answers.nombre);
          if (grupo != undefined) {
            console.log("El grupo ya existe");
            this.crearGrupo();
          } else {
            const miembros: number[] = [];
            const miembrosString = answers.miembros.split(",");
            for (let i = 0; i < miembrosString.length; i++) {
              const usuario = this.usuarios.findElement(miembrosString[i]);
              if (usuario != undefined) {
                miembros.push(usuario.id);
              }
            }
            this.grupos.addElement(
              new Grupo(
                answers.nombre,
                miembros,
                new Stats(),
                [],
                [],
                [],
                this.current_user.id
              )
            );
            this.mainMenu();
          }
        }
      });
  }
```

```typescript
  crearRuta() {
    console.clear();
    inquirer
      .prompt([
        {
          type: "input",
          name: "nombre",
          message: "Introduce el nombre de la ruta",
        },
        {
          type: "input",
          name: "longitud",
          message: "Introduce la longitud de la ruta",
        },
        {
          type: "input",
          name: "desnivel",
          message: "Introduce el desnivel de la ruta",
        },
        {
          type: "input",
          name: "coordenadas_inicio",
          message:
            "Introduce las coordenadas de inicio de la ruta separadas por comas",
        },
        {
          type: "input",
          name: "coordenadas_fin",
          message:
            "Introduce las coordenadas de fin de la ruta separadas por comas",
        },
        {
          type: "list",
          name: "tipo_ruta",
          message: "Introduce el tipo de ruta",
          choices: ["correr", "bicicleta"],
        },
      ])
      .then((answers) => {
        if (
          answers.nombre == "" ||
          answers.longitud < 0 ||
          answers.desnivel < 0 ||
          answers.coordenadas_inicio[0] == "" ||
          answers.coordenadas_inicio[1] == "" ||
          answers.coordenadas_fin[0] == "" ||
          answers.coordenadas_fin[1] == "" ||
          answers.tipo_ruta == ""
        ) {
          console.log("Error al crear la ruta, datos incorrectos");
          this.crearRuta();
        } else {
          const ruta = this.rutas.findElement(answers.nombre);
          if (ruta != undefined) {
            console.log("La ruta ya existe");
            this.crearRuta();
          } else {
            const coordenadas_inicio = answers.coordenadas_inicio.split(",");
            const coordenadas_fin = answers.coordenadas_fin.split(",");
            this.rutas.addElement(
              new Ruta(
                answers.nombre,
                [coordenadas_inicio[0], coordenadas_inicio[1]],
                [coordenadas_fin[0], coordenadas_fin[1]],
                answers.longitud,
                answers.desnivel,
                [],
                answers.tipo_ruta,
                []
              )
            );
            this.mainMenu();
          }
        }
      });
  }
```

```typescript
crearReto() {
  console.clear();
  inquirer
    .prompt([
      {
        type: "input",
        name: "nombre",
        message: "Introduce el nombre del reto",
      },
      {
        type: "list",
        name: "tipo_reto",
        message: "Introduce el tipo de reto",
        choices: ["correr", "bicicleta"],
      },
      {
        type: "input",
        name: "km_totales",
        message: "Introduce los km totales del reto",
      },
    ])
    .then((answers) => {
      if (
        answers.nombre == "" ||
        answers.tipo_reto == "" ||
        answers.km_totales < 0
      ) {
        console.log("Error al crear el reto, datos incorrectos");
        this.crearReto();
      } else {
        const reto = this.retos.findElement(answers.nombre);
        if (reto != undefined) {
          console.log("El reto ya existe");
          this.crearReto();
        } else {
          this.retos.addElement(
            new Reto(
              answers.nombre,
              [],
              answers.tipo_reto,
              answers.km_totales,
              []
            )
          );
          this.mainMenu();
        }
      }
    });
}
```

Los métodos anteriores son los que se encargan de crear los distintos elementos del programa, para ello se utiliza la librería inquirer para poder pedir los datos al usuario y crear los objetos con los datos introducidos. Si alguno de los datos introducidos no es correcto o ya está incluido en la base de datos, se volverá a pedir al usuario que introduzca los datos de nuevo.

### Eliminar datos

```typescript
eliminarUsuario(): void {
    console.clear();
    inquirer
      .prompt([
        {
          type: "list",
          name: "usuarios",
          message: "¿Que usuario quieres eliminar?",
          choices: this.usuarios
            .getAllElements()
            .map((usuario) => usuario.nombre),
        },
      ])
      .then((answers) => {
        this.usuarios.removeElement(answers.usuarios);
        console.log("Usuario eliminado correctamente");
        this.mainMenu();
      });
  }
```

```typescript
  eliminarReto(): void {
    console.clear();
    inquirer
      .prompt([
        {
          type: "list",
          name: "retos",
          message: "¿Que reto quieres eliminar?",
          choices: this.retos.getAllElements().map((reto) => reto.nombre),
        },
      ])
      .then((answers) => {
        this.retos.removeElement(answers.retos);
        console.log("Reto eliminado correctamente");
        this.mainMenu();
      });
  }
```

```typescript
  eliminarRuta(): void {
    console.clear();
    inquirer
      .prompt([
        {
          type: "list",
          name: "rutas",
          message: "¿Que ruta quieres eliminar?",
          choices: this.rutas.getAllElements().map((ruta) => ruta.nombre),
        },
      ])
      .then((answers) => {
        this.rutas.removeElement(answers.rutas);
        console.log("Ruta eliminada correctamente");
        this.mainMenu();
      });
  }
```

```typescript
  eliminarGrupo(): void {
    console.clear();
    inquirer
      .prompt([
        {
          type: "list",
          name: "grupos",
          message: "¿Que grupo quieres eliminar?",
          choices: this.grupos.getAllElements().map((grupo) => grupo.nombre),
        },
      ])
      .then((answers) => {
        const grupo = this.grupos.findElement(answers.grupos);
        if (grupo == undefined) {
          console.log("No existe el grupo");
          this.mainMenu();
        } else if (grupo.getOwner() !== this.current_user.id) {
          console.log("No eres el propietario del grupo");
          this.mainMenu();
        } else {
          this.grupos.removeElement(answers.grupos);
          console.log("Grupo eliminado correctamente");
          this.mainMenu();
        }
      });
  }
```

Estos métodos son los que se encargan de eliminar los distintos elementos del programa, para ello se utiliza la librería inquirer para poder pedir al usuario que seleccione el elemento que quiere eliminar. Si el usuario no es el propietario del grupo, no podrá eliminarlo.

### Modificar datos
