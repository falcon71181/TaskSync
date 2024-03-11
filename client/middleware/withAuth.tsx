import { useRouter } from "next/navigation";
import { useEffect } from "react";

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const Auth = (props: any) => {
    const router = useRouter();
    const SERVER = process.env.NEXT_PUBLIC_SERVER || "http://localhost:3333";

    useEffect(() => {
      // Verify User's jwt token
      const verifyUser = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          // Redirect to login page if token is missing
          router.push("/login");
          return;
        }

        try {
          const response = await fetch(`${SERVER}/users/validate`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            // Redirect to login page if token is invalid
            router.push("/login");
          }
        } catch (error) {
          // Handle fetch errors
          console.error("Error validating token:", error);
          // Optionally, you can redirect to an error page or display an error message
        }
      };

      verifyUser();
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Auth;
};

export default withAuth;
