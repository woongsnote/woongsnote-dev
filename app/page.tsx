import { Profile, SocialLinks } from '@/app/ui/profile';

export default function Home() {
  return (
    <div className="flex items-center flex-col">
      <Profile />
      <SocialLinks />
    </div>
  );
}
