import { SocialLinks } from '@/components';

export default function Footer() {
  return (
    <footer>
      <div className="container mx-auto justify-between items-center flex">
        <p className="text-xs">© 2023. Woongsnote All rights reserved.</p>

        <SocialLinks />
      </div>
    </footer>
  );
}
