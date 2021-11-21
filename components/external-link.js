export default function ExternalLink({ href, children, styles }) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      className={`text-indigo-500 hover:text-indigo-700 ${styles}`}
    >
      {children}
    </a>
  );
}
