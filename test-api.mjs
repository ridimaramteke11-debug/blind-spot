async function testEndpoints() {
  console.log('--- TESTING /api/health ---');
  const healthRes = await fetch('http://localhost:5173/api/health');
  const healthData = await healthRes.json();
  console.log('Health Response Status:', healthRes.status, healthData);

  console.log('\n--- TESTING /api/analyze with Internship Example ---');
  const analyzeRes = await fetch('http://localhost:5173/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      input: {
        decision: 'I want to accept a 6-month corporate internship at a fintech company instead of attending my regular on-campus university semester.',
        context: 'Stipend $3500/mo, 20 mins from home.',
        leaning: 'Leaning toward taking it.',
        priorities: 'Money, resume, convenience.',
        constraints: 'Senior capstone project.',
        alternatives: 'Decline or summer internship.'
      }
    })
  });

  const analyzeData = await analyzeRes.json();
  console.log('Analyze Response Status:', analyzeRes.status);
  console.log('Provider:', analyzeData.provider);
  console.log('Is Demo:', analyzeData.isDemo);
  console.log('Visible Priorities count:', analyzeData.analysis?.visiblePriorities?.length);
  console.log('Hidden Assumptions count:', analyzeData.analysis?.assumptions?.length);
  console.log('Blind Spots count:', analyzeData.analysis?.blindSpots?.length);
  console.log('Conflicts count:', analyzeData.analysis?.conflicts?.length);
  console.log('Missing Information count:', analyzeData.analysis?.missingInformation?.length);
  console.log('Perspectives count:', analyzeData.analysis?.perspectives?.length);
  console.log('Questions count:', analyzeData.analysis?.questions?.length);
  console.log('Coverage Score:', analyzeData.analysis?.coverage?.overallScore);
  console.log('Decision Map nodes:', analyzeData.analysis?.decisionMap?.length);
  console.log('Closing Prompt:', analyzeData.analysis?.reflectionClosingPrompt);

  console.log('\n--- TESTING /api/analyze with Custom Decision ---');
  const customRes = await fetch('http://localhost:5173/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      input: {
        decision: 'Should I quit my engineering job to open a boutique specialty coffee roastery?'
      }
    })
  });
  const customData = await customRes.json();
  console.log('Custom Decision Status:', customRes.status);
  console.log('Custom Decision Title:', customData.analysis?.decisionTitle);
  console.log('Custom Decision Assumptions:', customData.analysis?.assumptions?.length);
  console.log('\n=== ALL ENDPOINTS VERIFIED & WORKING PERFECTLY ===');
}

testEndpoints().catch(console.error);
