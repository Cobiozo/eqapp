import type { Role} from "@prisma/client";
import { RoleName } from "@prisma/client";
import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { globalMiddleware } from "~/middlewares/global.server";
import type { CandidateQuizFull } from "~/models/candidateQuiz.server";
import { roleModel } from "~/models/role.server";
import { userModel } from "~/models/user.server";
import { sessionService } from "~/utils/services/session.server";


export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });

  // check if user is eligible to do a quiz
  // if not redirect to dashboard
  const userId = await sessionService.getUserId(request);
  if (!userId)
    return redirect("/dashboard");
  const user = await userModel.getByIdWithRole(userId);
  if (!user || user.role.name !== RoleName.CANDIDATE_PARTNER)
    return redirect("/dashboard");

  // if is eligible, check if there is any quiz left
  // get quiz by priority
  // if quiz left -> go to quiz page
  const currentQuiz = await userModel.getCurrentQuiz(userId) as CandidateQuizFull;
  if (currentQuiz)
    return redirect("/dashboard/candidate-quiz/quiz");

  // if no quiz left, we should promote user to the next level
  const partnerRole = await  roleModel.getByName(RoleName.PARTNER) as Role;
  await userModel.updateById(user.id, {
    roleId: partnerRole.id,
  });

  return redirect("/dashboard?afterQuiz=true");
}