import Operation, {Assessment, OperationFilter, OperationType} from "@/models/Operation";

export default class FieldService {
  private operations: Array<Operation> = [
    new Operation({
      id: "f112-o0",
      type: OperationType.PLOWING,
      date: { year: 2018, month: 3, day: 12 },
      area: 48.2,
      comment: "Отлично вспахали",
      assessment: Assessment.EXCELLENT
    }),
    new Operation({
      id: "f112-o1",
      type: OperationType.FERTILIZATION,
      date: { year: 2018, month: 3, day: 14 },
      area: 47.8,
      comment: "Все прошло нормально",
      assessment: Assessment.SATISFACTORILY
    }),
    new Operation({
      id: "f112-o2",
      type: OperationType.RIGGING,
      date: { year: 2018, month: 3, day: 17 },
      area: 47.5,
      comment: null,
      assessment: Assessment.BADLY
    }),
    new Operation({
      id: "f112-o3",
      type: OperationType.BOWLING,
      date: { year: 2018, month: 3, day: 26 },
      area: 48.2,
      comment: null,
      assessment: null
    }),
    new Operation({
      id: "f112-o4",
      type: OperationType.WATERING,
      date: { year: 2018, month: 4, day: 2 },
      area: 48.1,
      comment: "Знатно полили",
      assessment: Assessment.EXCELLENT
    }),
    new Operation({
      id: "f112-o5",
      type: OperationType.HARVESTING,
      date: { year: 2018, month: 6, day: 20 },
      area: 48.0,
      comment: null,
      assessment: null
    })
  ];

  /**
   * Имитирует получение истории операций по тестовому полю 112
   * @returns {Promise<Array<Operation>>}
   */
  getOperations(): Promise<Array<Operation>> {
    return new Promise(resolve => {
      setTimeout(() => {
        const clonedOperations = this.operations.map(operation => operation);
        resolve(clonedOperations);
      }, 10);
    });
  }

  /**
   * Имитирует синхронное получение операции по id
   * @param {string | null} operationId
   * @returns {Operation | null}
   */
  private getOperationSync(
    operationId: string | null = null
  ): Operation | null {
    if (operationId === null) return null;
    const operation = this.operations.find(
      operation => operation.id === operationId
    );
    return operation || null;
  }

  /**
   * Имитирует получение операции по id
   * @param {string | null} operationId
   * @returns {Promise<Operation | null>}
   */
  getOperation(operationId: string | null = null): Promise<Operation | null> {
    return new Promise(resolve => {
      setTimeout(() => {
        const operation = this.getOperationSync(operationId);
        const clonedOperation = operation ? new Operation(operation) : null;
        resolve(clonedOperation);
      }, 10);
    });
  }

  /**
   * Имитирует создание/редактирование операции
   * @param {Operation} operation
   * @returns {Promise<Operation>}
   */
  saveOperation(operation: Operation): Promise<Operation> {
    return new Promise(resolve => {
      setTimeout(() => {
        const operationIndex: number = this.getOperationIndex(operation.id);
        const isExistingOperation: boolean = operationIndex !== -1;
        const operationToSave = new Operation(operation);

        if (isExistingOperation)
          this.operations.splice(operationIndex, 1, operationToSave);
        else {
          operationToSave.id = this.getNextId();
          this.operations.push(operationToSave);
        }
        const clonedOperation = new Operation(operationToSave);
        resolve(clonedOperation);
      }, 10);
    });
  }

  /**
   * Получает индекс операции
   * @param {string | null} operationId
   * @returns {number}
   */
  private getOperationIndex(operationId: string | null = null): number {
    if (operationId === null) return -1;
    const operation = this.getOperationSync(operationId);
    if (operation === null) return -1;
    return this.operations.indexOf(operation);
  }

  private getNextId() {
    const nextPartialId = this.operations.length;
    return `f112-o${nextPartialId}`;
  }

  /**
   * Сортирует массив операций по заданному полю по убыванию
   * @param {Array<Operation>} operations
   * @param {keyof Operation} sortField
   * @param {1 | Number(-1)} sortDirection
   * @param {any} locale
   * @returns {Promise<Operation>}
   */
  getSortedOperations(
    operations: Array<Operation>,
    sortField: keyof Operation,
    sortDirection: 1 | -1,
    locale: any
  ): Array<Operation> {
    return operations?.sort((operation: Operation, operation2: Operation) => {
      function createDateObject(operationDate: Operation["date"]) {
        const returnDate: Date = new Date();
        returnDate.setFullYear(
          operationDate.year,
          operationDate.month,
          operationDate.day
        );
        return returnDate;
      }

      if (sortField === "date") {
        const operationDate = createDateObject(operation.date);
        const operation2Date = createDateObject(operation2.date);
        return operation2Date > operationDate
          ? sortDirection * -1
          : operation2Date < operationDate
          ? sortDirection * 1
          : 0;
      }
      if (sortField === "type") {
        return (
          sortDirection *
          locale[OperationType[operation[sortField]]].localeCompare(
            locale[OperationType[operation2[sortField]]]
          )
        );
      }
      // @ts-ignore
      return sortDirection * (operation[sortField] - operation2[sortField]);
    });
  }

  /**
   * Фильтрует массив операций по заданному фильтру
   * @param {Array<Operation>} operations
   * @param {filter OperationFilter} filter
   * @returns {Promise<Operation>}
   */
  getFilteredOperations(
    operations: Array<Operation>,
    filter: OperationFilter
  ): Array<Operation> {
    {
      if (filter === "none") return operations;
      return operations?.filter((operation: Operation) => {
        if (filter === "done") return operation.assessment;
        if (filter === "plan") return !operation.assessment;
      });
    }
  }
}
