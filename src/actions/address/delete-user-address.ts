import prisma from "@/lib/prisma";

export const deleteUserAddress = async (userId: string) => {
  try {
    const addressToDelete = await prisma.address.findUnique({
      where: { userId },
    });
    if (addressToDelete) {
      await prisma.address.delete({ where: { userId } });
      return {
        ok: true,
        message: "Address deleted successfully.",
      };
    }
    console.log("User doesnt has an address");

    return {
      ok: false,
      message: "User did not had an address.",
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: "Could not delete user address from database.",
    };
  }
};
