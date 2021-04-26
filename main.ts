import * as path from 'path';

import { newEnforcer } from 'casbin';
import { MongooseAdapter } from 'casbin-mongoose-adapter';

async function main() {
  const adapter = await MongooseAdapter.newAdapter("mongodb://localhost:27017/test", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const enforcer = await newEnforcer(
    path.join(__dirname, '../assets/security_model.conf'),
    adapter,
  );

  return enforcer;
}

main().then(
  (enforcer) => console.log("OK", enforcer),
  (error) => console.error("ERROR", error),
);