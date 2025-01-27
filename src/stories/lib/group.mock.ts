import { fn } from "@storybook/test";

import * as group from "../../lib/TmelineGroup"

export const groupMockMember = fn(group.getGroup).mockName('groupMember');
