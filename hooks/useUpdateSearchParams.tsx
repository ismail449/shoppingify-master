import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const useUpdateSearchParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);

    return params.toString();
  };
  const updateSearchParams = (name: string, value: string) => {
    router.push(pathname + "?" + createQueryString(name, value));
  };
  return { updateSearchParams };
};

export default useUpdateSearchParams;
