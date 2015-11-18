//
//  CDVCopy.m
//  JajaReg
//
//  Created by gaozhifei on 15/6/18.
//
//

#import "CDVCopy.h"

@implementation CDVCopy

-(BOOL) shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)toInterfaceOrientation{
    return (toInterfaceOrientation == UIInterfaceOrientationMaskPortrait);
}

- (void)stringWithCopy:(CDVInvokedUrlCommand *)command
{
    // 使用后台线程
    [self.commandDelegate runInBackground:^{
        
        CDVPluginResult* pluginResult = nil;
        // 接收到的值
        NSString *txtCopy = [command.arguments objectAtIndex:0];
        NSLog(@"复制字符串:%@",txtCopy);
        if (txtCopy != nil && [txtCopy length] > 0) {
           
            // 粘贴板
            UIPasteboard *pasteboard = [UIPasteboard generalPasteboard];
            [pasteboard setString:txtCopy];
            
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"复制成功"];
        }
        else{
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
        }
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

@end
