import { Link } from 'react-router-dom';

const Copyright = () => <h2>{`Copyright © ${new Date().getFullYear()}.`}</h2>;

const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Location'],
  },
  {
    title: 'Features',
    description: ['Cool stuff', 'Random feature', 'Team feature'],
  },
  { title: 'Resources', description: ['Resource', 'Resource name'] },
  { title: 'Legal', description: ['Privacy policy', 'Terms of use'] },
];

const Footer = () => (
  <div className="absolute bottom-0 left-0 right-0 h-48 md:container mx-auto py-2 flex flex-col items-center border-t border-slate-300">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
      {footers.map((footer) => (
        <div className="mx-5" key={footer.title}>
          <h1 className="text-lg font-bold">{footer.title}</h1>
          <ul className="list-disc">
            {footer.description.map((item) => (
              <li key={item}>
                <Link to="/">{item}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="mt-4">
      <Copyright />
    </div>
  </div>
);

export default Footer;
