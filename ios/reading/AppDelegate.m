/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import <CodePush/CodePush.h>

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <Bugly/Bugly.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;
  
#ifdef DEBUG
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
#else
  jsCodeLocation = [CodePush bundleURL];
  [Bugly startWithAppId:@"b0c9343009"];
#endif
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"reading"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  
  NSString *launchImageName;
  if (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPhone) {
    if ([UIScreen mainScreen].bounds.size.height == 480) launchImageName = @"Default@2x.png"; // iPhone 4/4s, 3.5 inch screen
    if ([UIScreen mainScreen].bounds.size.height == 568) launchImageName = @"Default-568h@2x.png"; // iPhone 5/5s, 4.0 inch screen
    if ([UIScreen mainScreen].bounds.size.height == 667) launchImageName = @"launch_screen@2x.png"; // iPhone 6, 4.7 inch screen
    if ([UIScreen mainScreen].bounds.size.height == 736) launchImageName = @"launch_screen@3x.png"; // iPhone 6+, 5.5 inch screen
  }
  
  UIImage *image = [UIImage imageNamed:launchImageName];
  if (image) {
    NSLog(@"launch -- launch");
    CGRect screenRect = [[UIScreen mainScreen] bounds];
    CGFloat screenWidth = screenRect.size.width;
    CGFloat screenHeight = screenRect.size.height;
    UIImageView *launchView = [[UIImageView alloc] initWithImage: image];
    launchView.frame=CGRectMake(0, 0, screenWidth, screenHeight);
    launchView.contentMode = UIViewContentModeScaleToFill;
    launchView.image = image;
    rootView.loadingView = launchView;
  }
  
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

@end
