import { Profile, SocialLinks } from '@/app/ui/profile';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Profile />
      <SocialLinks />
    </div>
  );
}
