//
//  CDVChat.h
//  JajaReg
//
//  Created by gaozhifei on 15/6/24.
//
//

#import <Cordova/CDVPlugin.h>

@interface CDVChat : CDVPlugin

@property(strong) NSString* callbackID;

#pragma mark --- 发送Text消息给微信
- (void)sendWeChat:(CDVInvokedUrlCommand *)command;

#pragma mark --- 发送Text消息给QQ
- (void)sendQQ:(CDVInvokedUrlCommand *)command;
@end
