export async function createCourseService(data: CreateCourseModel) {
  try {
    const response = await axiosClientWithAuth.post(`/v1/courses`, data);
    return response.data.data;
  } catch (error: any) {
    // Extract error message from response if available
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    console.error("Error creating course:", error);
    throw error;
  }
}
