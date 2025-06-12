import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { command } = await request.json();

    if (!command) {
      return NextResponse.json({ success: false, error: 'No command provided' }, { status: 400 });
    }

    const acceptedCommands = [
      'startIrrigation',
      'stopIrrigation',
      'activateHeater',
      'deactivateHeater',
      'dispenseFertilizer',
    ];

    if (!acceptedCommands.includes(command)) {
      return NextResponse.json({ success: false, error: 'Invalid command' }, { status: 400 });
    }

    // Simulate successful command transmission.
    return NextResponse.json({ success: true, message: `Command ${command} executed` });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error processing control command' }, { status: 500 });
  }
}
