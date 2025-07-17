// Analytics endpoint for Chrome Extension
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { events } = req.body;
    
    if (!events || !Array.isArray(events)) {
      return res.status(400).json({ error: 'Invalid events data' });
    }

    // Log extension analytics (you can enhance this later)
    console.log('Chrome Extension Analytics:', {
      timestamp: new Date().toISOString(),
      eventCount: events.length,
      events: events.map(e => ({
        event: e.event,
        timestamp: e.timestamp,
        userId: e.userId,
        url: e.data?.url || 'unknown'
      }))
    });

    // TODO: Store in database when ready
    // await storeExtensionAnalytics(events);

    // For now, just acknowledge receipt
    res.status(200).json({ 
      success: true, 
      processed: events.length,
      message: 'Analytics received'
    });

  } catch (error) {
    console.error('Extension analytics error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
} 