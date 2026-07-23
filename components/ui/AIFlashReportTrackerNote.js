// Small cross-promo note for the model pages. AI Flash Report is a sister site
// in the same portfolio, so these are plain followed links.
export default function AIFlashReportTrackerNote({ className = '' }) {
  return (
    <p className={`text-sm text-gray-600 ${className}`}>
      Model lineups change often.{' '}
      <a href="https://aiflashreport.com/" className="text-blue-700 underline hover:text-blue-900">
        AI Flash Report
      </a>{' '}
      tracks new model releases and maintains a{' '}
      <a href="https://aiflashreport.com/deprecations/" className="text-blue-700 underline hover:text-blue-900">
        deprecation calendar
      </a>{' '}
      for models being retired.
    </p>
  );
}
