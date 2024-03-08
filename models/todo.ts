export type Task = {
  id: number;
  title: string;
  completed: boolean;
  tag : string[];
  date: Date;
  AnonUser : string;
};

//aca deberian haber muchas mas interfaces para las distintas respuestas pero no me da el time
export type TokenResponse = {
  token: string;
  AnonUser: string;
}