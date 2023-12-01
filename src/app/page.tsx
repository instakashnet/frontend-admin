import { Button } from "@/components/ui/button/Button";
import { Input } from "@/components/ui/input/Input";
import { User2Icon, LockKeyhole, EyeIcon } from "lucide-react";

export default function Home() {
  return (
    <div className='flex flex-col max-w-lg items-center justify-center m-auto h-screen'>
      <Input iconLeft={<User2Icon />} placeholder='Usuario' containerClasses='mb-4' />
      <Input type='password' iconLeft={<LockKeyhole />} iconRight={<EyeIcon />} placeholder='Contraseña' containerClasses='mb-4' />

      <Button className='w-full'>Button test</Button>
    </div>
  );
}
