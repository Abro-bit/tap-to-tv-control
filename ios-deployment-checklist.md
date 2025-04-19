
# iOS Deployment Checklist

## Pre-requisites
- [ ] Apple Developer Program enrollment completed
- [ ] Mac computer with Xcode installed (latest version recommended)
- [ ] Project transferred to your GitHub repository

## Setup Steps
1. [ ] Pull the project from your GitHub repository
   ```
   git clone <your-repo-url>
   cd <project-folder>
   npm install
   ```

2. [ ] Add iOS platform to your project
   ```
   npx cap add ios
   ```

3. [ ] Build your web app
   ```
   npm run build
   ```

4. [ ] Sync web code to iOS
   ```
   npx cap sync ios
   ```

5. [ ] Open Xcode project
   ```
   npx cap open ios
   ```

## Xcode Configuration
- [ ] Set Bundle Identifier (should match your capacitor.config.json appId)
- [ ] Configure your Team (using your Apple Developer account)
- [ ] Set Deployment Target (iOS version - recommend 13.0+)
- [ ] Configure App Icons in Xcode (Assets.xcassets)
- [ ] Configure Launch Screen in Xcode
- [ ] Update Display Name if needed
- [ ] Set Privacy Descriptions in Info.plist (if using camera, location, etc.)

## Testing
- [ ] Test on iOS Simulator
- [ ] Test on physical iOS device
- [ ] Verify network connections work properly
- [ ] Test all TV brand connections
- [ ] Verify TV scanning functionality
- [ ] Test pairing process
- [ ] Test remote control functionality

## Final Steps
- [ ] Create App Store listing
- [ ] Prepare app screenshots
- [ ] Write app description and keywords
- [ ] Archive app in Xcode
- [ ] Upload to App Store Connect
- [ ] Submit for review

## Common Issues
- Network connectivity issues (ensure Network plugin is properly configured)
- App permissions not working (check Info.plist entries)
- UI rendering issues (test on multiple device sizes)
