import { SocialLinks } from '@/components';

export default function Footer() {
  return (
    <footer>
      <p className="text-xs">
        © 2023. woongsnote All rights reserved.
        <br />
        built with Next.js | Developed by woongsnote
      </p>

      <SocialLinks />
    </footer>
  );
}
