import { invalidateCacheVersion } from "../../utils/function.js";
import { userActiveListModel, userChangePasswordModel, userGenerateLinkModel, userGetSearchModel, userListModel, userListReinvestedModel, userModelGet, userModelPost, userModelPut, userPatchModel, userProfileGetFbModel, userProfileModelPut, userProfilePutFbModel, userReferralModel, userSponsorModel, userTreeModel, } from "./user.model.js";
export const userPutController = async (c) => {
    try {
        const { email, password, userId } = await c.req.json();
        await userModelPut({ email, password, userId });
        return c.json({ message: "User Updated" });
    }
    catch (error) {
        return c.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
export const userPostController = async (c) => {
    try {
        const { memberId } = await c.req.json();
        const user = await userModelPost({ memberId });
        return c.json(user);
    }
    catch (error) {
        return c.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
export const userGetController = async (c) => {
    try {
        const params = c.get("params");
        const teamMemberProfile = c.get("teamMemberProfile");
        const data = await userModelGet({
            memberId: params.id ? params.id : teamMemberProfile.company_member_id,
        });
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
export const userPatchController = async (c) => {
    try {
        const { action, role, type } = await c.req.json();
        const { id } = c.req.param();
        await userPatchModel({ memberId: id, action, role, type });
        await invalidateCacheVersion(`user-list`);
        return c.json({ message: "User Updated" });
    }
    catch (error) {
        return c.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
export const userSponsorController = async (c) => {
    try {
        const { userId } = await c.req.json();
        const data = await userSponsorModel({ userId });
        return c.json(data, { status: 200 });
    }
    catch (error) {
        return c.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
export const userProfilePutController = async (c) => {
    try {
        const { profilePicture } = await c.req.json();
        const { id } = c.req.param();
        await userProfileModelPut({ profilePicture, userId: id });
        return c.json({ message: "Profile Updated" });
    }
    catch (error) {
        return c.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
export const userGenerateLinkController = async (c) => {
    try {
        const { formattedUserName } = await c.req.json();
        const data = await userGenerateLinkModel({ formattedUserName });
        return c.json({ url: data });
    }
    catch (error) {
        return c.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
export const userListController = async (c) => {
    try {
        const params = c.get("params");
        const teamMemberProfile = c.get("teamMemberProfile");
        const { data, totalCount } = await userListModel(params, teamMemberProfile);
        return c.json({ data, totalCount });
    }
    catch (error) {
        return c.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
export const userActiveListController = async (c) => {
    try {
        const params = c.get("params");
        const data = await userActiveListModel(params);
        return c.json(data, { status: 200 });
    }
    catch (error) {
        return c.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
export const userChangePasswordController = async (c) => {
    try {
        const params = c.get("params");
        await userChangePasswordModel(params);
        return c.json({ message: "Password Updated" });
    }
    catch (error) {
        return c.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
export const userListReinvestedController = async (c) => {
    try {
        const params = c.get("params");
        const data = await userListReinvestedModel(params);
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
export const userTreeController = async (c) => {
    try {
        const params = c.get("params");
        const data = await userTreeModel(params);
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
export const userGetSearchController = async (c) => {
    try {
        const params = c.get("params");
        const data = await userGetSearchModel(params);
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
export const userReferralController = async (c) => {
    try {
        const params = c.get("params");
        const data = await userReferralModel(params);
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
export const userProfilePutFbController = async (c) => {
    try {
        const params = c.get("params");
        const data = await userProfilePutFbModel(params);
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
export const userProfileGetFbController = async (c) => {
    try {
        const teamMemberProfile = c.get("teamMemberProfile");
        const data = await userProfileGetFbModel({
            userId: teamMemberProfile.company_user_id,
        });
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
