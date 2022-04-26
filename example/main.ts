import { BaseAbility,CheckRecordOptions } from "../mod.ts";
import { log } from "../deps.ts";
import { VERSION } from "../version.ts";

class Ability extends BaseAbility {
  constructor(ctx:any, user:any) {
    super(ctx, user)
  }

  // override
  async rules(action:string, obj:any, options:CheckRecordOptions):boolean {
    const { type } = options;

    if (type === 'topic') {
      if (action === 'update') {
        return await this.canUpdateTopic(obj);
      }

      if (action === 'delete') {
        return await this.canDeleteTopic(obj);
      }
    }

    return true;
  }
   canUpdateTopic(obj: any) {
    if (obj.user_id === this.user.user_id) return true;
    return false;
  }

   canDeleteTopic(obj: any) {
    if (this.user.role === 'admin') return true;
    return false;
  }
}


try {
  log.info(`Module Version (version.ts): ${VERSION}`);
} catch (error) {
  console.error(error);
  Deno.exit();
}
