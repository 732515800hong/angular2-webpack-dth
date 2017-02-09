import { Subject } from 'rxjs/Subject';

export class DialogConfig {
  type?: number;
  title: string;
  content: string;
  btns?: Array<DialogBtn>;
  shade?: boolean = true;
  skin?: string;
  loading?: boolean;
}

export class DialogBtn {

  text: string;

  clickEvent?: Subject<any>;

}

