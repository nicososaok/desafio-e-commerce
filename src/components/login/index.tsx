import { getCode } from "@lib/api";
export const LoginPage (){
  const handle = async () => {
    await getCode();
  };
  return <form onSubmit={handle}></form>;
};