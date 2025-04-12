export interface IBilletCsv {
  id: number;
  withdrawName: string;
  lotId: number;
  value: number;
  writeLine: string;
  enable: boolean;
  createdAt: Date;
  updatedAt: Date;
}
