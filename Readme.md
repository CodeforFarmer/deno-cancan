# Deno-CanCan

this is porting from egg-cancan

## Folder Structure

- `.vscode` = A folder,
  - containing a `settings.json` which activates the deno language server for
    this workspace
  - containing a `extensions.json` with recommended vscode extensions for this
    workspace
- `example` = A folder, containing entry deno files for demonstrating the
  modules functionalities
  - contains `main.ts` - the default file for examples
- `dependencies` = A folder, including dependency re-exports
- `lib` = A folder containing more source files which are exported by `mod.ts`
  - Hint: you may create multiple of them to structure your module.
- `.gitignore` = A normal gitingore file
- `deno.json` - a config file for the deno cli
  - includes tasks (a.k.a aliases for long commands) with `deno task`
- `LICENSE`
- `mod.ts` = the entrypoint for this deno module, which exports all
  functionality of this module
- `Readme.md` = A normal Readme file

## Running examples

see `tasks` property in `deno.json` Run each key there with
`deno task <task-key>`

## Customize this repo

- replace `lib/startKia.ts` with a file which makes more sense for your deno
  module

## Configure Deployments to deno.land/x

see https://deno.land/x/cancan

## Uage

```typescript
import {
  BaseAbility,
  CheckRecordOptions,
} from "https://deno.land/x/cancan/mod.ts";

class Ability extends BaseAbility {
  constructor(ctx: any, user: any) {
    super(ctx, user);
  }

  // override
  async rules(action: string, obj: any, options: CheckRecordOptions): boolean {
    const { type } = options;

    if (type === "topic") {
      if (action === "update") {
        return await this.canUpdateTopic(obj);
      }

      if (action === "delete") {
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
    if (this.user.role === "admin") return true;
    return false;
  }
}
```

### Action alias

| Action | Alias           |
| ------ | --------------- |
| read   | show, read      |
| update | edit, update    |
| create | new, create     |
| delete | destroy, delete |

### Cache check result in same Context

Ability support cache Ability check result in ctx, you can enable it by change
`.env.example`

```bash
LOG_ENABLE=false
CACHE_ENABLE=true
```

When you enable that, you call `can` method will hit cache:

```
ctx.can('read', user);
- check cache in ability._cache
    found -> return
  not exist ->
    execute `rules` to real check
    write to _cache
    return
```

Its use `action + obj + options` stringify as default cache key:

```bash
ability.cacheKey('read', { id: 1 }, { type: 'user' });
=> 'read-{id:1}-{type:"user"}'
```

You can rewrite it by override the `cacheKey` method, for example:

```js
class Ability extends BaseAbility {
  cacheKey(action, obj, options) {
    return [action, obj.cacheKey, options.type].join(":");
  }
}
```

## Check Abilities

The `ctx.can` method:

```js
can = await ctx.can('create', topic, { type: 'topic' });
can = await ctx.can('read', topic, { type: 'topic' });
can = await ctx.can('update', topic, { type: 'topic' });
can = await ctx.can('delete', topic, { type: 'topic' });

can = await ctx.can('update', user, { type: 'user' });

// For egg-sequelize model instance, not need pass `:type` option
const topic = await ctx.model.Topic.findById(...);
can = await ctx.can('update', topic);
```

The `ctx.authorize` method:

```js
await ctx.authorize("read", topic);
// when permission is ok, not happend
// when no permission, will throw CanCanAccessDenied
```

## Handle Unauthorized Access

If the `ctx.authorize` check fails, a `CanCanAccessDenied` error will be throw.
You can catch this and modify its behavior:

Add new file: `app/middleware/handle_authorize.js`

```ts
export const handleAuthorize = async function (ctx, next) {
  try {
     // do your code
    await next();
  } catch (e) {
    if (e.name === "CanCanAccessDenied") {
      this.status = 403;
      this.body = "Access Denied";
    } else {
      throw e;
    }
  }
};
```

## Testing your abilities

WIP

## License

[MIT](LICENSE)
